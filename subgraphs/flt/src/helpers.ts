import { log, BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";
import { ERC20 } from "../generated/Factory/ERC20";
import { FLT as FLTContract } from "../generated/templates/FLT/FLT";
import {
    Factory,
    FLT,
    ETHPriceData,
    FLTHourData,
    FLTDayData,
} from "../generated/schema";

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

export function convertETHToDecimal(eth: BigInt): BigDecimal {
    return eth.toBigDecimal().div(exponentToBigDecimal(BigInt.fromI32(18)));
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

function fetchFLTPriceETH(tokenAddress: Address): BigInt {
    let contract = FLTContract.bind(tokenAddress);
    return contract.price();
}

function fetchFLTCollateralPerShare(tokenAddress: Address): BigInt {
    let contract = FLTContract.bind(tokenAddress);
    return contract.collateralPerShare();
}

function fetchFLTDebtPerShare(tokenAddress: Address): BigInt {
    let contract = FLTContract.bind(tokenAddress);
    return contract.debtPerShare();
}

function fetchFLTTotalCollateral(tokenAddress: Address): BigInt {
    let contract = FLTContract.bind(tokenAddress);
    return contract.totalCollateral();
}

function fetchFLTTotalDebt(tokenAddress: Address): BigInt {
    let contract = FLTContract.bind(tokenAddress);
    return contract.totalDebt();
}

export function updateFLTHourData(
    fltId: string,
    ethPriceData: ETHPriceData,
    eventTimestamp: BigInt
): FLTHourData {
    let timestamp = eventTimestamp.toI32();
    let hourIndex = timestamp / 3600;
    let hourStartUnix = hourIndex * 3600;
    let fltHourID = fltId.concat("-").concat(hourIndex.toString());
    let fltHourData = FLTHourData.load(fltHourID);
    let fltPriceETH = convertETHToDecimal(
        fetchFLTPriceETH(Address.fromString(fltId))
    );
    let fltPriceUSD = fltPriceETH.times(ethPriceData.priceUSD);
    if (fltHourData === null) {
        // Basic metadata
        fltHourData = new FLTHourData(fltHourID);
        fltHourData.periodStartUnix = hourStartUnix;
        fltHourData.flt = fltId;

        // Price data
        fltHourData.open = fltPriceUSD;
        fltHourData.high = fltPriceUSD;
        fltHourData.low = fltPriceUSD;
        fltHourData.close = fltPriceUSD;
        fltHourData.priceUSD = fltPriceUSD;

        // Trade data
        fltHourData.tradeVolume = ZERO_BD;
        fltHourData.tradeVolumeUSD = ZERO_BD;
        fltHourData.tradeFeeUSD = ZERO_BD;
        fltHourData.tradeTxns = ZERO_BI;
    }

    // Update price data
    if (fltPriceUSD.gt(fltHourData.high)) {
        fltHourData.high = fltPriceUSD;
    }
    if (fltPriceUSD.lt(fltHourData.low)) {
        fltHourData.low = fltPriceUSD;
    }
    fltHourData.close = fltPriceUSD;
    fltHourData.priceUSD = fltPriceUSD;

    // Update underlying data
    fltHourData.collateralPerShare = fetchFLTCollateralPerShare(
        Address.fromString(fltId)
    );
    fltHourData.debtPerShare = fetchFLTDebtPerShare(Address.fromString(fltId));
    fltHourData.totalCollateral = fetchFLTTotalCollateral(
        Address.fromString(fltId)
    );
    fltHourData.totalDebt = fetchFLTTotalDebt(Address.fromString(fltId));
    fltHourData.totalSupply = fetchTokenTotalSupply(Address.fromString(fltId));

    // Persist data
    fltHourData.save();
    return fltHourData;
}

export function updateFLTDayData(
    fltId: string,
    ethPriceData: ETHPriceData,
    eventTimestamp: BigInt
): FLTDayData {
    let timestamp = eventTimestamp.toI32();
    let dayIndex = timestamp / 86400;
    let dayStartUnix = dayIndex * 86400;
    let fltDayID = fltId.concat("-").concat(dayIndex.toString());
    let fltDayData = FLTDayData.load(fltDayID);
    let fltPriceETH = convertETHToDecimal(
        fetchFLTPriceETH(Address.fromString(fltId))
    );
    let fltPriceUSD = fltPriceETH.times(ethPriceData.priceUSD);
    if (fltDayData === null) {
        // Basic metadata
        fltDayData = new FLTDayData(fltDayID);
        fltDayData.periodStartUnix = dayStartUnix;
        fltDayData.flt = fltId;

        // Price data
        fltDayData.open = fltPriceUSD;
        fltDayData.high = fltPriceUSD;
        fltDayData.low = fltPriceUSD;
        fltDayData.close = fltPriceUSD;
        fltDayData.priceUSD = fltPriceUSD;

        // Trade data
        fltDayData.tradeVolume = ZERO_BD;
        fltDayData.tradeVolumeUSD = ZERO_BD;
        fltDayData.tradeFeeUSD = ZERO_BD;
        fltDayData.tradeTxns = ZERO_BI;
    }

    // Update price data
    if (fltPriceUSD.gt(fltDayData.high)) {
        fltDayData.high = fltPriceUSD;
    }
    if (fltPriceUSD.lt(fltDayData.low)) {
        fltDayData.low = fltPriceUSD;
    }
    fltDayData.close = fltPriceUSD;
    fltDayData.priceUSD = fltPriceUSD;

    // Update underlying data
    fltDayData.collateralPerShare = fetchFLTCollateralPerShare(
        Address.fromString(fltId)
    );
    fltDayData.debtPerShare = fetchFLTDebtPerShare(Address.fromString(fltId));
    fltDayData.totalCollateral = fetchFLTTotalCollateral(
        Address.fromString(fltId)
    );
    fltDayData.totalDebt = fetchFLTTotalDebt(Address.fromString(fltId));
    fltDayData.totalSupply = fetchTokenTotalSupply(Address.fromString(fltId));

    // Persist data
    fltDayData.save();
    return fltDayData;
}
