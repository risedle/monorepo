import { Address, BigDecimal, ethereum } from "@graphprotocol/graph-ts";

// Schema
import { Protocol, Token, LiquidityPool } from "../../generated/schema";

// This contant is generated via:
// $ npm run constgen
import * as protocolInfo from "../../generated/protocol";

// Shared entities
import {
    getOrCreateProtocol,
    getOrCreateAccount,
    getOrCreateContract,
    getOrCreateTransaction,
    getOrCreateToken,
    getOrCreateLiquidityPool,
    getOrCreateTokenLiquidityPool,
} from "./index";

// Libs
import { ZERO_BD, FIFTY_PERCENT } from "../libs/math";

// Create Liquidity Pool
export function createLiquidityPool(
    poolAddress: Address,
    poolName: string,
    poolSlug: string,
    tokenCount: i32,
    tokens: Array<Token>,
    tokenWeights: Array<BigDecimal>,
    lpFee: BigDecimal,
    protocolFee: BigDecimal,
    swapFee: BigDecimal,
    block: ethereum.Block,
    transaction: ethereum.Transaction,
    receipt: ethereum.TransactionReceipt
): void {
    // Load Protocol
    const protocol = Protocol.load("1");
    if (protocol == null) return;

    // Get or create Account
    const account = getOrCreateAccount(transaction.from, protocol);

    // Get or create Contract
    const contractAddress = transaction.to;
    if (contractAddress === null) return;
    const contract = getOrCreateContract(contractAddress, protocol);

    // Get or create new Transaction
    if (receipt == null) return;
    const tx = getOrCreateTransaction(
        block,
        transaction,
        receipt,
        account,
        contract,
        protocol
    );

    // Create new pool
    const pool = new LiquidityPool(poolAddress.toHexString());
    pool.name = poolName;
    pool.slug = poolSlug;
    pool.createdAtTimestamp = block.timestamp;
    pool.createdAtBlockNumber = block.number;
    pool.tokenCount = tokenCount;
    pool.lpFee = lpFee;
    pool.protocolFee = protocolFee;
    pool.swapFee = swapFee;

    pool.protocol = protocol.id;
    pool.transaction = tx.id;
    pool.createdBy = account.id;

    // Persist data
    account.save();
    contract.save();
    tx.save();
    pool.save();

    // Map tokens to pool
    for (let i = 0; i < tokenCount; i++) {
        const token = tokens[i];
        const weight = tokenWeights[i];
        const tokenPool = getOrCreateTokenLiquidityPool(token, pool, weight);
        tokenPool.save();
    }
}
