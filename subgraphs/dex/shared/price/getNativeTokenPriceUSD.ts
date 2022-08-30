// Source: uniswap/v3-subgraph and uniswap-v2/subgraph
import { BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";

// NOTE: data source name must be Factory for all subgraph.yaml
import { UniswapV3Pool } from "../../generated/Factory/UniswapV3Pool";
import { UniswapV2Pool } from "../../generated/Factory/UniswapV2Pool";

// Schema
import { Protocol, NativeTokenPrice } from "../../generated/schema";

// Constant generated from /protocols/*/configs/chain.json
import {
    WETH_ADDRESS,
    CHAIN_ID,
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
    ZERO_BI,
    ZERO_BD,
} from "../libs/math";

// Shared entities
import { getOrCreateToken } from "../entities";

const Q192 = 2 ** 192;
export function sqrtPriceX96ToTokenPrices(
    sqrtPriceX96: BigInt,
    token0Decimals: BigInt,
    token1Decimals: BigInt
): BigDecimal[] {
    let num = sqrtPriceX96.times(sqrtPriceX96).toBigDecimal();
    let denom = BigDecimal.fromString(Q192.toString());
    let price1 = num
        .div(denom)
        .times(exponentToBigDecimal(token0Decimals))
        .div(exponentToBigDecimal(token1Decimals));

    let price0 = safeDiv(BigDecimal.fromString("1"), price1);
    return [price0, price1];
}

// Get native token price in USD
export function getNativeTokenPriceUSD(block: ethereum.Block): BigDecimal {
    // Get pre-computed price first
    let price = NativeTokenPrice.load(block.number.toString());
    if (price != null) return price.usd;

    // Get protocol
    const protocol = Protocol.load("1");
    if (protocol == null) return ZERO_BD;

    // If pre-computed doesn't exist try from Uniswap V3
    let priceUSD = ZERO_BD;
    if (
        UNI_V3_USDC_WETH_BLOCK.gt(ZERO_BI) &&
        block.number.gt(UNI_V3_USDC_WETH_BLOCK)
    ) {
        // Get price from Uniswap V3
        const contract = UniswapV3Pool.bind(UNI_V3_USDC_WETH_POOL);
        const sqrtPrice = contract.slot0().getSqrtPriceX96();
        const token0Address = contract.token0();
        const token0 = getOrCreateToken(token0Address);
        const token1Address = contract.token1();
        const token1 = getOrCreateToken(token1Address);

        const prices = sqrtPriceX96ToTokenPrices(
            sqrtPrice,
            token0.decimals,
            token1.decimals
        );
        if (token0Address.toHexString() == WETH_ADDRESS.toHexString()) {
            priceUSD = prices[0];
        }
        if (token1Address.toHexString() == WETH_ADDRESS.toHexString()) {
            priceUSD = prices[1];
        }
    }

    // If pre-computed doesn't exist and Uniswap V3 is not deployed on chain
    // then fetch price from Uniswap V2 and its fork
    if (
        UNI_V2_USDC_WETH_BLOCK.gt(ZERO_BI) &&
        block.number.gt(UNI_V2_USDC_WETH_BLOCK)
    ) {
        // Get price from Uniswap V2
        const contract = UniswapV2Pool.bind(UNI_V2_USDC_WETH_POOL);
        const token0Address = contract.token0();
        const token0 = getOrCreateToken(token0Address);
        const token1Address = contract.token1();
        const token1 = getOrCreateToken(token1Address);
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

    // Save computed price
    price = new NativeTokenPrice(block.number.toString());
    price.usd = priceUSD;
    price.timestamp = block.timestamp;
    price.save();

    return priceUSD;
}
