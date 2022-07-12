// Contract call mocks
import { createMockedFunction } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

import { ETHRISE, ETHUSD } from "./helpers";
import { ORACLE_ADDRESS } from "../src/helpers";

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
    "maxSupply",
    "maxSupply():(uint256)"
).returns([
    ethereum.Value.fromUnsignedBigInt(
        BigInt.fromString("1000000000000000000000000")
    ),
]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "decimals",
    "decimals():(uint8)"
).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("18"))]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "price",
    "price():(uint256)"
).returns([
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("300000000000000000")),
]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "collateralPerShare",
    "collateralPerShare():(uint256)"
).returns([
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("400000000000000000")),
]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "debtPerShare",
    "debtPerShare():(uint256)"
).returns([
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("500000000000000000")),
]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "totalCollateral",
    "totalCollateral():(uint256)"
).returns([
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("600000000000000000")),
]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "totalDebt",
    "totalDebt():(uint256)"
).returns([
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("700000000000000000")),
]);

createMockedFunction(
    Address.fromString(ETHUSD),
    "decimals",
    "decimals():(uint8)"
).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("8"))]);

createMockedFunction(
    Address.fromString(ETHRISE),
    "value",
    "value(uint256):(uint256)"
)
    .withArgs([
        ethereum.Value.fromUnsignedBigInt(
            BigInt.fromString("1000000000000000000")
        ),
    ])
    .returns([
        ethereum.Value.fromUnsignedBigInt(
            BigInt.fromString("30000000000000000")
        ),
    ]);

createMockedFunction(
    Address.fromString(ORACLE_ADDRESS),
    "totalValue",
    "totalValue(address,address,uint256):(uint256)"
)
    .withArgs([
        ethereum.Value.fromAddress(
            Address.fromString("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")
        ),
        ethereum.Value.fromAddress(
            Address.fromString("0x0000000000000000000000000000000000000000")
        ),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString("10000000")),
    ])
    .returns([
        ethereum.Value.fromUnsignedBigInt(
            BigInt.fromString("4000000000000000")
        ),
    ]);
