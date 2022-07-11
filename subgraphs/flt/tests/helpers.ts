import { newMockEvent } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

import { Swap as SwapEvent } from "../generated/templates/FLT/FLT";

// Dummy data
const SENDER = "0x8888888c0a5be14f3fc72a8c97ec489dee9c4460";
const RECIPIENT = "0x1418be4753a22b69b613fa8b8144d856c023d46b";
export const BNBRISE = "0x2e876c4cfef54417949d9bdbb350dd0e2775d1cc";
export const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

export function createSwapEvent(
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    amountOut: string,
    feeAmount: string,
    priceInETH: string
): SwapEvent {
    let newSwapEvent = changetype<SwapEvent>(newMockEvent());
    newSwapEvent.parameters = new Array();

    // Build params
    let senderParam = new ethereum.EventParam(
        "sender",
        ethereum.Value.fromAddress(Address.fromString(SENDER))
    );
    let recipientParam = new ethereum.EventParam(
        "name",
        ethereum.Value.fromAddress(Address.fromString(RECIPIENT))
    );
    let tokenInParam = new ethereum.EventParam(
        "tokenIn",
        ethereum.Value.fromAddress(Address.fromString(tokenIn))
    );
    let tokenOutParam = new ethereum.EventParam(
        "tokenOut",
        ethereum.Value.fromAddress(Address.fromString(tokenOut))
    );
    let amountInParam = new ethereum.EventParam(
        "amountIn",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString(amountIn))
    );
    let amountOutParam = new ethereum.EventParam(
        "amountOut",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString(amountOut))
    );
    let feeAmountParam = new ethereum.EventParam(
        "feeAmount",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString(feeAmount))
    );
    let priceInETHParam = new ethereum.EventParam(
        "priceInETH",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString(priceInETH))
    );

    // Push the params
    newSwapEvent.parameters.push(senderParam);
    newSwapEvent.parameters.push(recipientParam);
    newSwapEvent.parameters.push(tokenInParam);
    newSwapEvent.parameters.push(tokenOutParam);
    newSwapEvent.parameters.push(amountInParam);
    newSwapEvent.parameters.push(amountOutParam);
    newSwapEvent.parameters.push(feeAmountParam);
    newSwapEvent.parameters.push(priceInETHParam);

    return newSwapEvent;
}
