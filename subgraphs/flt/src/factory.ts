import { log, BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";

import { TokenCreated } from "../generated/Factory/FLTFactory";
import { ERC20 } from "../generated/Factory/ERC20";
import { FLT } from "../generated/templates";
import { Factory, Token } from "../generated/schema";

import { FACTORY_ADDRESS, ZERO_BI, ZERO_BD } from "./helpers";

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

export function handleNewFLT(event: TokenCreated): void {
    // load factory (create if first exchange)
    let factory = Factory.load(FACTORY_ADDRESS);
    if (factory === null) {
        factory = new Factory(FACTORY_ADDRESS);
        factory.fltCount = 0;
        factory.totalVolumeETH = ZERO_BD;
        factory.totalVolumeUSD = ZERO_BD;
        factory.txCount = ZERO_BI;
    }
    factory.fltCount = factory.fltCount + 1;

    // Save FLT as token
    let flt = Token.load(event.params.token.toHexString());
    if (flt === null) {
        flt = new Token(event.params.token.toHexString());
        flt.symbol = fetchTokenSymbol(event.params.token);
        flt.name = fetchTokenName(event.params.token);
        flt.totalSupply = fetchTokenTotalSupply(event.params.token);
        flt.isFLT = true;

        // bail if we couldn't figure out the decimals
        let decimals = fetchTokenDecimals(event.params.token);
        if (decimals === null) {
            log.debug("mybug the decimal on token 0 was null", []);
            return;
        }
        flt.decimals = decimals;

        flt.tradeVolume = ZERO_BD;
        flt.tradeVolumeETH = ZERO_BD;
        flt.tradeVolumeUSD = ZERO_BD;

        flt.derivedETH = ZERO_BD;
        flt.txCount = ZERO_BI;
    }

    // create the tracked contract based on the template
    FLT.create(event.params.token);

    factory.save();
    flt.save();
}
