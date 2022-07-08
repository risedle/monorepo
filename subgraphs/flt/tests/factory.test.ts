import {
    describe,
    test,
    assert,
    newMockEvent,
    createMockedFunction,
} from "matchstick-as/assembly/index";
import { logStore } from "matchstick-as/assembly/store";
import { ethereum, Address } from "@graphprotocol/graph-ts";

import { TokenCreated } from "../generated/Factory/FLTFactory";
import { handleNewFLT } from "../src/factory";

import { ZERO_BI, DECIMALS_BI, FACTORY_ADDRESS } from "../src/helpers";

const TEST_NEW_FLT_TOKEN = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
createMockedFunction(
    Address.fromString(TEST_NEW_FLT_TOKEN),
    "symbol",
    "symbol():(string)"
).returns([ethereum.Value.fromString("ETHRISE")]);

createMockedFunction(
    Address.fromString(TEST_NEW_FLT_TOKEN),
    "name",
    "name():(string)"
).returns([ethereum.Value.fromString("2X Long ETH Risedle")]);

createMockedFunction(
    Address.fromString(TEST_NEW_FLT_TOKEN),
    "totalSupply",
    "totalSupply():(uint256)"
).returns([ethereum.Value.fromUnsignedBigInt(ZERO_BI)]);

createMockedFunction(
    Address.fromString(TEST_NEW_FLT_TOKEN),
    "decimals",
    "decimals():(uint8)"
).returns([ethereum.Value.fromUnsignedBigInt(DECIMALS_BI)]);

function createTokenCreatedEvent(
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

describe("handleNewFLT()", () => {
    describe("given TokenCreatedEvent", () => {
        test("should create new Factory and Token", () => {
            // Create mockup then call the handler
            let event = createTokenCreatedEvent(
                TEST_NEW_FLT_TOKEN,
                "2X Long ETH Risedle",
                "ETHRISE"
            );
            handleNewFLT(event);

            // Make sure the factory is created
            assert.fieldEquals(
                "Factory",
                FACTORY_ADDRESS,
                "id",
                FACTORY_ADDRESS
            );
            assert.fieldEquals("Factory", FACTORY_ADDRESS, "fltCount", "1");
            assert.fieldEquals(
                "Factory",
                FACTORY_ADDRESS,
                "totalVolumeUSD",
                "0"
            );
            assert.fieldEquals(
                "Factory",
                FACTORY_ADDRESS,
                "totalVolumeETH",
                "0"
            );
            assert.fieldEquals("Factory", FACTORY_ADDRESS, "txCount", "0");

            // Make sure FLT is created
            assert.fieldEquals(
                "Token",
                TEST_NEW_FLT_TOKEN,
                "id",
                TEST_NEW_FLT_TOKEN
            );
            assert.fieldEquals(
                "Token",
                TEST_NEW_FLT_TOKEN,
                "symbol",
                "ETHRISE"
            );
            assert.fieldEquals(
                "Token",
                TEST_NEW_FLT_TOKEN,
                "name",
                "2X Long ETH Risedle"
            );
            assert.fieldEquals("Token", TEST_NEW_FLT_TOKEN, "decimals", "18");
            assert.fieldEquals("Token", TEST_NEW_FLT_TOKEN, "isFLT", "true");
            assert.fieldEquals(
                "Token",
                TEST_NEW_FLT_TOKEN,
                "totalSupply",
                "0"
            );
            assert.fieldEquals(
                "Token",
                TEST_NEW_FLT_TOKEN,
                "tradeVolume",
                "0"
            );
            assert.fieldEquals(
                "Token",
                TEST_NEW_FLT_TOKEN,
                "tradeVolumeETH",
                "0"
            );
            assert.fieldEquals(
                "Token",
                TEST_NEW_FLT_TOKEN,
                "tradeVolumeUSD",
                "0"
            );
            assert.fieldEquals("Token", TEST_NEW_FLT_TOKEN, "txCount", "0");
            assert.fieldEquals("Token", TEST_NEW_FLT_TOKEN, "derivedETH", "0");
        });
    });
});
