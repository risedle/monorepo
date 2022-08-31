import { newMockEvent } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

import { PoolCreated } from "../../../generated/Factory/Factory";

export function createPoolCreatedEvent(
    token0Address: Address,
    token1Address: Address
): PoolCreated {
    // Create new mock
    const mock = changetype<PoolCreated>(newMockEvent());
    mock.parameters = new Array<ethereum.EventParam>();

    // Build params
    const token0 = new ethereum.EventParam(
        "token0",
        ethereum.Value.fromAddress(token0Address)
    );
    const token1 = new ethereum.EventParam(
        "token1",
        ethereum.Value.fromAddress(token1Address)
    );
    const fee = new ethereum.EventParam(
        "fee",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString("3000"))
    );
    const tickSpacing = new ethereum.EventParam(
        "tickSpacing",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString("300"))
    );
    const pool = new ethereum.EventParam(
        "pool",
        ethereum.Value.fromAddress(
            Address.fromString("0x3b1b258ca111b9bae664b5a7ea8fb12ac0656551")
        )
    );

    // NOTE: the push order is important
    mock.parameters.push(token0);
    mock.parameters.push(token1);
    mock.parameters.push(fee);
    mock.parameters.push(tickSpacing);
    mock.parameters.push(pool);

    return mock;
}
