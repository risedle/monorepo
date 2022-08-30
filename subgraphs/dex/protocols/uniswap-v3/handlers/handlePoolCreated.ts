import { BigDecimal } from "@graphprotocol/graph-ts";

import { PoolCreated } from "../../../generated/Factory/Factory";

// Shared entities
import {
    getOrCreateProtocol,
    getOrCreateToken,
    createLiquidityPool,
} from "../../../shared/entities";

// Math libs
import { ZERO_BD, FIFTY_PERCENT } from "../../../shared/libs/math";

// This contant is generated via npm run constgen
import * as protocolInfo from "../../../generated/protocol";

// Convert Uniswap V3 fee tiers to percent
// 100 -> 0.01%
// 500 -> 0.05%
// 3000 -> 0.3%
// 5000 -> 0.5%
// 10000 -> 1%
export function convertFeeToPercent(fee: i64): BigDecimal {
    return BigDecimal.fromString(fee.toString()).div(
        BigDecimal.fromString("10000")
    );
}

export function handlePoolCreated(event: PoolCreated): void {
    // ████ Protocol █████████████████████████████████████████████████████████

    // Get or create Protocol
    const protocol = getOrCreateProtocol(
        protocolInfo.NAME,
        protocolInfo.SLUG,
        protocolInfo.CHAIN_ID,
        protocolInfo.CHAIN_SLUG,
        protocolInfo.CHAIN_NAME
    );

    // ████ Tokens ███████████████████████████████████████████████████████████

    // Get or create new tokens
    const token0 = getOrCreateToken(event.params.token0);
    const token1 = getOrCreateToken(event.params.token1);

    // ████ Pool █████████████████████████████████████████████████████████████

    const poolAddress = event.params.pool;

    // Fees;
    // LPFee -> fee collected by liquidity provider
    // ProtocolFee -> fee collected by protocol
    // SwapFee -> LPFee + ProtocolFee
    const swapFee = convertFeeToPercent(event.params.fee);
    const lpFee = swapFee;
    const protocolFee = ZERO_BD;
    // e.g. "Uniswap V3 USDC/WETH 1%"
    const poolName = protocolInfo.NAME.concat(" ")
        .concat(token0.symbol)
        .concat("/")
        .concat(token1.symbol)
        .concat(" ")
        .concat(swapFee.toString())
        .concat("%");
    // e.g "uniswap-v3-usdc-weth-1"
    const poolSlug = protocolInfo.SLUG.concat("-")
        .concat(token0.symbol.toLowerCase())
        .concat("-")
        .concat(token1.symbol.toLowerCase())
        .concat("-")
        .concat(swapFee.toString());

    const tokenCount = 2;
    const tokens = [token0, token1];
    const tokenWeights = [FIFTY_PERCENT, FIFTY_PERCENT];
    const receipt = event.receipt;

    // Create pool
    // Skip if receipt is null
    if (receipt == null) return;
    createLiquidityPool(
        poolAddress,
        poolName,
        poolSlug,
        tokenCount,
        tokens,
        tokenWeights,
        lpFee,
        protocolFee,
        swapFee,
        event.block,
        event.transaction,
        receipt
    );

    // Persist data
    protocol.save();
    token0.save();
    token1.save();
}
