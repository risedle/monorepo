import { BigDecimal } from "@graphprotocol/graph-ts";

import { PoolCreated } from "../../../generated/Factory/Factory";

// Shared entities
import {
    getOrCreateProtocol,
    getOrCreateToken,
    getOrCreateLiquidityPool,
    getOrCreateTokenLiquidityPool,
    // Fees
    LiquidityPoolFeeType,
    getOrCreateLPFee,
    getOrCreateProtocolFee,
    getOrCreateSwapFee,
} from "../../../shared/entities";

// Libs
import { ZERO_BD, HALF_PERCENT } from "../../../shared/libs/math";

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
    let protocol = getOrCreateProtocol(
        protocolInfo.NAME,
        protocolInfo.SLUG,
        protocolInfo.CHAIN_ID,
        protocolInfo.CHAIN_SLUG,
        protocolInfo.CHAIN_NAME
    );
    protocol.totalLiquidityPoolCount += 1;

    // ████ Tokens ███████████████████████████████████████████████████████████

    // Get or create new tokens
    let token0 = getOrCreateToken(event.params.token0, protocol);
    let token1 = getOrCreateToken(event.params.token1, protocol);
    token0.totalLiquidityPoolCount += 1;
    token1.totalLiquidityPoolCount += 1;

    // ████ Pool █████████████████████████████████████████████████████████████

    // Get or create new liquidity pool
    let poolSwapFeePercentage = convertFeeToPercent(event.params.fee);
    // e.g. "Uniswap V3 USDC/WETH 1%"
    let poolName = protocolInfo.NAME.concat(" ")
        .concat(token0.symbol)
        .concat("/")
        .concat(token1.symbol)
        .concat(" ")
        .concat(poolSwapFeePercentage.toString())
        .concat("%");
    // e.g "uniswap-v3-usdc-weth-1"
    let poolSlug = protocolInfo.SLUG.concat("-")
        .concat(token0.symbol.toLowerCase())
        .concat("-")
        .concat(token1.symbol.toLowerCase())
        .concat("-")
        .concat(poolSwapFeePercentage.toString());
    let pool = getOrCreateLiquidityPool(
        event.params.pool,
        poolName,
        poolSlug,
        protocol
    );
    pool.tokenCount = 2;
    pool.createdAtTimestamp = event.block.timestamp;
    pool.createdAtBlockNumber = event.block.number;

    // Get or create token<->pool mapping
    let token0Pool = getOrCreateTokenLiquidityPool(token0, pool, HALF_PERCENT);
    let token1Pool = getOrCreateTokenLiquidityPool(token1, pool, HALF_PERCENT);

    // Fees;
    // LPFee -> fee collected by liquidity provider
    // ProtocolFee -> fee collected by protocol
    // SwapFee -> LPFee + ProtocolFee
    let poolLPFee = getOrCreateLPFee(
        pool,
        poolSwapFeePercentage,
        LiquidityPoolFeeType.FIXED_LP_FEE
    );
    let poolProtocolFee = getOrCreateProtocolFee(
        pool,
        ZERO_BD,
        LiquidityPoolFeeType.FIXED_PROTOCOL_FEE
    );
    let poolSwapFee = getOrCreateSwapFee(
        pool,
        poolSwapFeePercentage,
        LiquidityPoolFeeType.FIXED_SWAP_FEE
    );

    // ████ Persist data █████████████████████████████████████████████████████

    // Saves
    protocol.save();
    token0.save();
    token1.save();
    pool.save();
    token0Pool.save();
    token1Pool.save();
    poolLPFee.save();
    poolProtocolFee.save();
    poolSwapFee.save();
}
