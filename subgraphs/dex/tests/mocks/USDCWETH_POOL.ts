import { createMockedFunction } from "matchstick-as/assembly/index";
import { ethereum, BigInt } from "@graphprotocol/graph-ts";

import { UNI_V3_USDC_WETH_POOL, WETH_ADDRESS } from "../../generated/protocol";

import { ADDRESS } from "./USDC";

createMockedFunction(
    UNI_V3_USDC_WETH_POOL,
    "slot0",
    "slot0():(uint160,int24,uint16,uint16,uint16,uint8,bool)"
).returns([
    ethereum.Value.fromUnsignedBigInt(
        BigInt.fromString("1990847386658830595984234378170879")
    ),
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("202644")),
    ethereum.Value.fromSignedBigInt(BigInt.fromString("246")),
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1440")),
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1440")),
    ethereum.Value.fromUnsignedBigInt(BigInt.fromString("0")),
    ethereum.Value.fromBoolean(true),
]);

createMockedFunction(
    UNI_V3_USDC_WETH_POOL,
    "token0",
    "token0():(address)"
).returns([ethereum.Value.fromAddress(ADDRESS)]);

createMockedFunction(
    UNI_V3_USDC_WETH_POOL,
    "token1",
    "token1():(address)"
).returns([ethereum.Value.fromAddress(WETH_ADDRESS)]);
