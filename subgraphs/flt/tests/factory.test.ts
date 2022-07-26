import { describe, test, assert } from "matchstick-as/assembly/index";
import { logStore } from "matchstick-as/assembly/store";
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";

import { Factory, FLT, Token } from "../generated/schema";
import { handleTokenCreated } from "../src/factory";

import { FACTORY_ADDRESS } from "../src/helpers";
import { ETHRISE, WETH, USDC, createTokenCreatedEvent } from "./helpers";

// Mock contract calls
import "./mocks";

describe("handleNewFLT()", () => {
    describe("given TokenCreatedEvent", () => {
        test("should create new Factory and Token", () => {
            // Create mock event then call the handler
            let event = createTokenCreatedEvent(
                ETHRISE,
                "2X Long ETH Risedle",
                "ETHRISE"
            );
            handleTokenCreated(event);
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

            // Check params
            assert.stringEquals(flt.minLeverageRatio.toString(), "1.4");
            assert.stringEquals(flt.maxLeverageRatio.toString(), "2.4");
            assert.stringEquals(flt.maxDrift.toString(), "0.4");
            assert.stringEquals(flt.maxIncentive.toString(), "0.2");
            assert.stringEquals(flt.maxSupply.toString(), "1000000");

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
