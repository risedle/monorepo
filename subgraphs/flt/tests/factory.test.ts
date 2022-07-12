import {
    describe,
    test,
    assert,
    newMockEvent,
    createMockedFunction,
} from "matchstick-as/assembly/index";
import { logStore } from "matchstick-as/assembly/store";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";

import { TokenCreated } from "../generated/Factory/FLTFactory";
import { Factory, FLT, Token } from "../generated/schema";
import { handleNewFLT } from "../src/factory";

import { FACTORY_ADDRESS } from "../src/helpers";
import { ETHRISE, WETH, USDC } from "./helpers";

// Mock contract calls
import "./mocks";

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
            // Create mock event then call the handler
            let event = createTokenCreatedEvent(
                ETHRISE,
                "2X Long ETH Risedle",
                "ETHRISE"
            );
            handleNewFLT(event);
            // logStore();

            // Make sure the factory is created
            let factory = Factory.load(FACTORY_ADDRESS)!;
            assert.stringEquals(factory.id, FACTORY_ADDRESS);
            assert.bigIntEquals(factory.fltCount, BigInt.fromString("1"));
            assert.stringEquals(factory.totalVolumeUSD.toString(), "0");
            assert.bigIntEquals(factory.totalTxns, BigInt.fromString("0"));

            let flt = FLT.load(ETHRISE)!;
            assert.stringEquals(flt.id, ETHRISE);
            assert.stringEquals(flt.name, "2X Long ETH Risedle");
            assert.stringEquals(flt.symbol, "ETHRISE");
            assert.bigIntEquals(flt.decimals, BigInt.fromString("18"));
            assert.stringEquals(flt.collateral, WETH);
            assert.stringEquals(flt.debt, USDC);

            let collateral = Token.load(WETH)!;
            assert.stringEquals(collateral.symbol, "WETH");
            assert.bigIntEquals(collateral.decimals, BigInt.fromString("18"));

            let debt = Token.load(USDC)!;
            assert.stringEquals(debt.symbol, "USDC");
            assert.bigIntEquals(debt.decimals, BigInt.fromString("6"));

            assert.stringEquals(flt.totalVolume.toString(), "0");
            assert.stringEquals(flt.totalVolumeUSD.toString(), "0");
            assert.stringEquals(flt.totalFeeUSD.toString(), "0");
            assert.bigIntEquals(flt.totalTxns, BigInt.fromString("0"));
        });
    });
});
