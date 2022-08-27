import { createMockedFunction } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

export const ADDRESS = Address.fromString(
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
);

createMockedFunction(ADDRESS, "name", "name():(string)").returns([
    ethereum.Value.fromString("USD Coin"),
]);

createMockedFunction(ADDRESS, "symbol", "symbol():(string)").returns([
    ethereum.Value.fromString("USDC"),
]);

createMockedFunction(ADDRESS, "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("6")),
]);

createMockedFunction(
    ADDRESS,
    "totalSupply",
    "totalSupply():(uint256)"
).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1000"))]);
