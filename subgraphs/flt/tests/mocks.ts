// Contract call mocks
import { createMockedFunction } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

import { ETHRISE } from "./helpers";

createMockedFunction(
    Address.fromString(ETHRISE),
    "symbol",
    "symbol():(string)"
).returns([ethereum.Value.fromString("ETHRISE")]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "name",
    "name():(string)"
).returns([ethereum.Value.fromString("2X Long ETH Risedle")]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "totalSupply",
    "totalSupply():(uint256)"
).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("0"))]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "decimals",
    "decimals():(uint8)"
).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("18"))]);
