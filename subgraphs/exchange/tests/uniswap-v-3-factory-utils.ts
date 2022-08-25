import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import {
    FeeAmountEnabled,
    OwnerChanged,
    PoolCreated,
} from "../generated/UniswapV3Factory/UniswapV3Factory";

export function createFeeAmountEnabledEvent(
    fee: i32,
    tickSpacing: i32
): FeeAmountEnabled {
    let feeAmountEnabledEvent = changetype<FeeAmountEnabled>(newMockEvent());

    feeAmountEnabledEvent.parameters = new Array();

    feeAmountEnabledEvent.parameters.push(
        new ethereum.EventParam(
            "fee",
            ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fee))
        )
    );
    feeAmountEnabledEvent.parameters.push(
        new ethereum.EventParam(
            "tickSpacing",
            ethereum.Value.fromI32(tickSpacing)
        )
    );

    return feeAmountEnabledEvent;
}

export function createOwnerChangedEvent(
    oldOwner: Address,
    newOwner: Address
): OwnerChanged {
    let ownerChangedEvent = changetype<OwnerChanged>(newMockEvent());

    ownerChangedEvent.parameters = new Array();

    ownerChangedEvent.parameters.push(
        new ethereum.EventParam(
            "oldOwner",
            ethereum.Value.fromAddress(oldOwner)
        )
    );
    ownerChangedEvent.parameters.push(
        new ethereum.EventParam(
            "newOwner",
            ethereum.Value.fromAddress(newOwner)
        )
    );

    return ownerChangedEvent;
}

export function createPoolCreatedEvent(
    token0: Address,
    token1: Address,
    fee: i32,
    tickSpacing: i32,
    pool: Address
): PoolCreated {
    let poolCreatedEvent = changetype<PoolCreated>(newMockEvent());

    poolCreatedEvent.parameters = new Array();

    poolCreatedEvent.parameters.push(
        new ethereum.EventParam("token0", ethereum.Value.fromAddress(token0))
    );
    poolCreatedEvent.parameters.push(
        new ethereum.EventParam("token1", ethereum.Value.fromAddress(token1))
    );
    poolCreatedEvent.parameters.push(
        new ethereum.EventParam(
            "fee",
            ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fee))
        )
    );
    poolCreatedEvent.parameters.push(
        new ethereum.EventParam(
            "tickSpacing",
            ethereum.Value.fromI32(tickSpacing)
        )
    );
    poolCreatedEvent.parameters.push(
        new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
    );

    return poolCreatedEvent;
}
