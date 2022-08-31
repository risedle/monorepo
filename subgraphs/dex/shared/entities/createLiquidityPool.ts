import {
    Address,
    BigDecimal,
    BigInt,
    ethereum,
} from "@graphprotocol/graph-ts";

// Schema
import { Protocol, Token, LiquidityPool } from "../../generated/schema";

// Shared entities
import {
    getOrCreateAccount,
    getOrCreateTransaction,
    getOrCreateTokenLiquidityPool,
} from "./index";

// Create Liquidity Pool
export function createLiquidityPool(
    protocol: Protocol,
    event: ethereum.Event,
    poolAddress: Address,
    poolName: string,
    poolSlug: string,
    tokenCount: BigInt,
    tokens: Array<Token>,
    tokenWeights: Array<BigDecimal>,
    lpFee: BigDecimal,
    protocolFee: BigDecimal,
    swapFee: BigDecimal
): LiquidityPool {
    // Get or create new Account
    const account = getOrCreateAccount(protocol, event.transaction.from);

    // Get or create Transaction
    const transaction = getOrCreateTransaction(protocol, account, event);

    // Create new pool
    const pool = new LiquidityPool(poolAddress.toHexString());
    pool.name = poolName;
    pool.slug = poolSlug;
    pool.createdAtTimestamp = event.block.timestamp;
    pool.createdAtBlockNumber = event.block.number;
    pool.tokenCount = tokenCount;
    pool.lpFee = lpFee;
    pool.protocolFee = protocolFee;
    pool.swapFee = swapFee;

    pool.protocol = protocol.id;
    pool.transaction = transaction.id;
    pool.createdBy = account.id;

    // Persist data
    account.save();
    transaction.save();
    pool.save();

    // Map tokens to pool
    for (let i = 0; i < tokenCount.toI32(); i++) {
        const token = tokens[i];
        const weight = tokenWeights[i];
        const tokenPool = getOrCreateTokenLiquidityPool(token, pool, weight);
        tokenPool.save();
    }

    return pool;
}
