import { newMockEvent } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

import { Swap as SwapEvent } from "../generated/templates/FLT/FLT";
import { AnswerUpdated } from "../generated/AccessControlledOffchainAggregator/AccessControlledOffchainAggregator";

// Dummy data
export const SENDER = "0x8888888c0a5be14f3fc72a8c97ec489dee9c4460";
export const RECIPIENT = "0x1418be4753a22b69b613fa8b8144d856c023d46b";
export const USER = "0x1418be4753a22b69b613fa8b8144d856c023d46b";
export const ETHRISE = "0x2e876c4cfef54417949d9bdbb350dd0e2775d1cc";
export const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const ETHUSD = "0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6";

export function createSwapEvent(
    flt: string,
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    amountOut: string,
    feeAmount: string,
    priceInETH: string
): SwapEvent {
    let newSwapEvent = changetype<SwapEvent>(newMockEvent());
    newSwapEvent.address = Address.fromString(flt);
    newSwapEvent.parameters = new Array();
    let tx = newSwapEvent.transaction;
    tx.from = Address.fromString(USER);
    newSwapEvent.transaction = tx;

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

export function createAnswerUpdatedEvent(current: string): AnswerUpdated {
    let newAnswerUpdated = changetype<AnswerUpdated>(newMockEvent());
    newAnswerUpdated.address = Address.fromString(ETHUSD);
    newAnswerUpdated.parameters = new Array();

    // Build params
    let currentParam = new ethereum.EventParam(
        "current",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString(current))
    );
    let roundIdParam = new ethereum.EventParam(
        "roundId",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString("100"))
    );
    let updatedAtParam = new ethereum.EventParam(
        "updatedAt",
        ethereum.Value.fromUnsignedBigInt(BigInt.fromString("200"))
    );

    // Push the params
    newAnswerUpdated.parameters.push(currentParam);
    newAnswerUpdated.parameters.push(roundIdParam);
    newAnswerUpdated.parameters.push(updatedAtParam);

    return newAnswerUpdated;
}
