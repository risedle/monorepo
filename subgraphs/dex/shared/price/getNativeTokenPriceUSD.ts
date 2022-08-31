// Source: uniswap/v3-subgraph and uniswap-v2/subgraph
import { BigDecimal, BigInt, ethereum, log } from "@graphprotocol/graph-ts";

// NOTE: data source name must be Factory for all subgraph.yaml
import { UniswapV3Pool } from "../../generated/Factory/UniswapV3Pool";
import { UniswapV2Pool } from "../../generated/Factory/UniswapV2Pool";

// Schema
import { Protocol } from "../../generated/schema";

// Constant generated from /protocols/*/configs/chain.json
import {
    WETH_ADDRESS,
    UNI_V2_USDC_WETH_BLOCK,
    UNI_V2_USDC_WETH_POOL,
    UNI_V3_USDC_WETH_BLOCK,
    UNI_V3_USDC_WETH_POOL,
} from "../../generated/protocol";

// Math libs
import {
    exponentToBigDecimal,
    safeDiv,
    tokenAmountToDecimal,
    ZERO_BD,
    ONE_BI,
} from "../libs/math";

// Shared entities
import { getOrCreateToken } from "../entities";

export function sqrtPriceX96ToTokenPrices(
    sqrtPriceX96: BigInt,
    token0Decimals: BigInt,
    token1Decimals: BigInt
): BigDecimal[] {
    const Q192 = BigInt.fromString("2").pow(192).toBigDecimal();
    log.info("Args: {} {} {} {}", [
        sqrtPriceX96.toString(),
        token0Decimals.toString(),
        token1Decimals.toString(),
        Q192.toString(),
    ]);
    const num = sqrtPriceX96.times(sqrtPriceX96).toBigDecimal();
    const denom = BigDecimal.fromString(Q192.toString());
    const price1 = num
        .div(denom)
        .times(exponentToBigDecimal(token0Decimals))
        .div(exponentToBigDecimal(token1Decimals));

    const price0 = safeDiv(BigDecimal.fromString("1"), price1);
    return [price0, price1];
}

// Get native token price in USD
export function getNativeTokenPriceUSD(
    protocol: Protocol,
    block: ethereum.Block
): BigDecimal {
    let priceUSD = ZERO_BD;

    // Try to get price from Uniswap V3 first
    if (
        UNI_V3_USDC_WETH_BLOCK.gt(ONE_BI) &&
        block.number.gt(UNI_V3_USDC_WETH_BLOCK)
    ) {
        // Get price from Uniswap V3
        const contract = UniswapV3Pool.bind(UNI_V3_USDC_WETH_POOL);
        const sqrtPrice = contract.slot0().getSqrtPriceX96();
        const token0Address = contract.token0();
        const token0 = getOrCreateToken(protocol, token0Address);
        const token1Address = contract.token1();
        const token1 = getOrCreateToken(protocol, token1Address);

        const prices = sqrtPriceX96ToTokenPrices(
            sqrtPrice,
            token0.decimals,
            token1.decimals
        );
        log.info("Prices: {} {}", [
            prices[0].toString(),
            prices[1].toString(),
        ]);
        if (token0Address.toHexString() == WETH_ADDRESS.toHexString()) {
            priceUSD = prices[1];
        }
        if (token1Address.toHexString() == WETH_ADDRESS.toHexString()) {
            priceUSD = prices[0];
        }
    }

    // If Uniswap V3 is not deployed on chain
    // then fetch price from Uniswap V2 or its fork
    if (
        UNI_V2_USDC_WETH_BLOCK.gt(ONE_BI) &&
        block.number.gt(UNI_V2_USDC_WETH_BLOCK)
    ) {
        // Get price from Uniswap V2
        const contract = UniswapV2Pool.bind(UNI_V2_USDC_WETH_POOL);
        const token0Address = contract.token0();
        const token0 = getOrCreateToken(protocol, token0Address);
        const token1Address = contract.token1();
        const token1 = getOrCreateToken(protocol, token1Address);
        const reserve0 = tokenAmountToDecimal(
            contract.getReserves().get_reserve0(),
            token0.decimals
        );
        const reserve1 = tokenAmountToDecimal(
            contract.getReserves().get_reserve1(),
            token1.decimals
        );

        if (token0Address.toHexString() == WETH_ADDRESS.toHexString()) {
            priceUSD = reserve0.div(reserve1);
        }
        if (token1Address.toHexString() == WETH_ADDRESS.toHexString()) {
            priceUSD = reserve1.div(reserve0);
        }
    }

    return priceUSD;
}
