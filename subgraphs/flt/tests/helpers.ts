import { newMockEvent } from "matchstick-as/assembly/index";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

import {
    Swap as SwapEvent,
    ParamsUpdated,
} from "../generated/templates/FLT/FLT";
import { AnswerUpdated } from "../generated/AccessControlledOffchainAggregator/AccessControlledOffchainAggregator";
import { TokenCreated } from "../generated/Factory/FLTFactory";

// Dummy data
export const SENDER = "0x8888888c0a5be14f3fc72a8c97ec489dee9c4460";
export const RECIPIENT = "0x1418be4753a22b69b613fa8b8144d856c023d46b";
export const USER = "0x1418be4753a22b69b613fa8b8144d856c023d46b";
export const ETHRISE = "0x2e876c4cfef54417949d9bdbb350dd0e2775d1cc";
export const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const ETHUSD = "0x37bC7498f4FF12C19678ee8fE19d713b87F6a9e6";

export function createTokenCreatedEvent(
    tokenAddress: string,
    tokenName: string,
    tokenSymbol: string
): TokenCreated {
    let newTokenCreatedEvent = changetype<TokenCreated>(newMockEvent());
    newTokenCreatedEvent.parameters = new Array();

    // Build params
    let tokenAddressParam = new ethereum.EventParam(
        "token",
        ethereum.Value.fromAddress(Address.fromString(tokenAddress))
    );
    let tokenNameParam = new ethereum.EventParam(
        "name",
        ethereum.Value.fromString(tokenName)
    );
    let tokenSymbolParam = new ethereum.EventParam(
        "symbol",
        ethereum.Value.fromString(tokenSymbol)
    );

    // push the parameters
    newTokenCreatedEvent.parameters.push(tokenAddressParam);
    newTokenCreatedEvent.parameters.push(tokenNameParam);
    newTokenCreatedEvent.parameters.push(tokenSymbolParam);

    return newTokenCreatedEvent;
}

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

export function createParamsUpdatedEvent(flt: string): ParamsUpdated {
    let newParamsUpdated = changetype<ParamsUpdated>(newMockEvent());
    newParamsUpdated.address = Address.fromString(flt);
    newParamsUpdated.parameters = new Array();

    // Build params
    let minLeverageRatioParam = new ethereum.EventParam(
        "minLeverageRatio",
        ethereum.Value.fromUnsignedBigInt(
            BigInt.fromString("1560000000000000000")
        )
    );
    let maxLeverageRatioParam = new ethereum.EventParam(
        "maxLeverageRatio",
        ethereum.Value.fromUnsignedBigInt(
            BigInt.fromString("2260000000000000000")
        )
    );
    let maxDriftParam = new ethereum.EventParam(
        "maxDrift",
        ethereum.Value.fromUnsignedBigInt(
            BigInt.fromString("340000000000000000")
        )
    );
    let maxIncentiveParam = new ethereum.EventParam(
        "maxIncentive",
        ethereum.Value.fromUnsignedBigInt(
            BigInt.fromString("197000000000000000")
        )
    );
    let maxSupplyParam = new ethereum.EventParam(
        "maxSupply",
        ethereum.Value.fromUnsignedBigInt(
            BigInt.fromString("123000000000000000000")
        )
    );

    // Push the params
    newParamsUpdated.parameters.push(minLeverageRatioParam);
    newParamsUpdated.parameters.push(maxLeverageRatioParam);
    newParamsUpdated.parameters.push(maxDriftParam);
    newParamsUpdated.parameters.push(maxIncentiveParam);
    newParamsUpdated.parameters.push(maxSupplyParam);

    return newParamsUpdated;
}
