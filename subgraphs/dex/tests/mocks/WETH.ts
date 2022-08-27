import { createMockedFunction } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

export const ADDRESS = Address.fromString(
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
);

createMockedFunction(ADDRESS, "name", "name():(string)").returns([
    ethereum.Value.fromString("Wrapped ETH"),
]);

createMockedFunction(ADDRESS, "symbol", "symbol():(string)").returns([
    ethereum.Value.fromString("WETH"),
]);

createMockedFunction(ADDRESS, "decimals", "decimals():(uint8)").returns([
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("18")),
]);

createMockedFunction(
    ADDRESS,
    "totalSupply",
    "totalSupply():(uint256)"
).returns([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1000"))]);
