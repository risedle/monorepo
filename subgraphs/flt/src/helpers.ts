import {
    log,
    BigInt,
    BigDecimal,
    Address,
    EthereumEvent,
} from "@graphprotocol/graph-ts";

export const FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");
export let BI_18 = BigInt.fromI32(18);
