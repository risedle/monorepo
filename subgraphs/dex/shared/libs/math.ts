// Source: uniswap/v3-subgraph
import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const BI_18 = BigInt.fromI32(18);
export const FIFTY_PERCENT = BigDecimal.fromString("50");
export const ONE_ETH = BigInt.fromString("10").pow(18);

// Convert decimals to exponent (e.g. 18 -> 10e18)
export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString("1");
    for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
        bd = bd.times(BigDecimal.fromString("10"));
    }
    return bd;
}

// return 0 if denominator is 0 in division
export function safeDiv(amount0: BigDecimal, amount1: BigDecimal): BigDecimal {
    if (amount1.equals(ZERO_BD)) {
        return ZERO_BD;
    } else {
        return amount0.div(amount1);
    }
}

// Convert token amount to decimals
// (e.g. tokenAmount=2*10e18, decimals=18 -> 2)
export function tokenAmountToDecimal(
    tokenAmount: BigInt,
    exchangeDecimals: BigInt
): BigDecimal {
    if (exchangeDecimals == ZERO_BI) {
        return tokenAmount.toBigDecimal();
    }
    return tokenAmount
        .toBigDecimal()
        .div(exponentToBigDecimal(exchangeDecimals));
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
    return eth
        .toBigDecimal()
        .div(exponentToBigDecimal(BigInt.fromString("18")));
}
