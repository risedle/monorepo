import { log, BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";
import { ERC20 } from "../generated/Factory/ERC20";
import { FLT as FLTContract } from "../generated/templates/FLT/FLT";
import { Factory, FLT } from "../generated/schema";

export const FACTORY_ADDRESS = "0x888884173B6E6f4B42731853b89c39591ac53d92";
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const BI_18 = BigInt.fromI32(18);
export const DECIMALS_BI = BigInt.fromI32(18);

function fetchTokenSymbol(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress);
    let symbolValue = "unknown";
    let symbolResult = contract.try_symbol();
    if (!symbolResult.reverted) {
        symbolValue = symbolResult.value;
    }
    return symbolValue;
}

function fetchTokenName(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress);
    let nameValue = "unknown";
    let nameResult = contract.try_name();
    if (!nameResult.reverted) {
        nameValue = nameResult.value;
    }
    return nameValue;
}

function fetchTokenDecimals(tokenAddress: Address): BigInt | null {
    let contract = ERC20.bind(tokenAddress);
    let decimalResult = contract.try_decimals();
    if (!decimalResult.reverted) {
        return BigInt.fromI32(decimalResult.value);
    }
    return null;
}

function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
    let contract = ERC20.bind(tokenAddress);
    let totalSupplyValue: BigInt = ZERO_BI;
    let totalSupplyResult = contract.try_totalSupply();
    if (!totalSupplyResult.reverted) {
        totalSupplyValue = totalSupplyResult.value;
    }
    return totalSupplyValue;
}

export function loadOrInitializeFactory(): Factory {
    let factory = Factory.load(FACTORY_ADDRESS);
    if (factory === null) {
        factory = new Factory(FACTORY_ADDRESS);
        factory.fltCount = ZERO_BI;
        factory.totalVolumeETH = ZERO_BD;
        factory.totalVolumeUSD = ZERO_BD;
        factory.txCount = ZERO_BI;
        factory.flts = [];
    }
    return factory;
}

export function loadOrInitializeFLT(tokenAddress: Address): FLT {
    let flt = FLT.load(tokenAddress.toHexString());
    if (flt === null) {
        flt = new FLT(tokenAddress.toHexString());
        flt.symbol = fetchTokenSymbol(tokenAddress);
        flt.name = fetchTokenName(tokenAddress);
        // bail if we couldn't figure out the decimals
        let decimals = fetchTokenDecimals(tokenAddress);
        if (decimals === null) {
            throw new Error("can't figure out the decimals");
        }
        flt.decimals = decimals;

        flt.totalSupply = fetchTokenTotalSupply(tokenAddress);
        flt.maxTotalSupply = fetchFLTMaxSupply(tokenAddress);

        flt.tradeVolume = ZERO_BI;
        flt.tradeVolumeUSD = ZERO_BD;

        flt.txCount = ZERO_BI;
    }
    return flt;
}

function fetchFLTMaxSupply(tokenAddress: Address): BigInt {
    let contract = FLTContract.bind(tokenAddress);
    return contract.maxSupply();
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString("1");
    for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
        bd = bd.times(BigDecimal.fromString("10"));
    }
    return bd;
}

export function convertTokenToDecimal(
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
