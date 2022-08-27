import { newMockEvent } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

import { PoolCreated } from "../../../generated/Factory/Factory";

export function createPoolCreatedEvent(
    token0Address: Address,
    token1Address: Address
): PoolCreated {
    // Create new mock
    let mock = changetype<PoolCreated>(newMockEvent());
    mock.parameters = new Array();

    // Build params
    let token0 = new ethereum.EventParam(
        "token0",
        ethereum.Value.fromAddress(token0Address)
    );
    let token1 = new ethereum.EventParam(
        "token1",
        ethereum.Value.fromAddress(token1Address)
    );
    let fee = new ethereum.EventParam(
        "fee",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString("3000"))
    );
    let tickSpacing = new ethereum.EventParam(
        "tickSpacing",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString("300"))
    );
    let pool = new ethereum.EventParam(
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
