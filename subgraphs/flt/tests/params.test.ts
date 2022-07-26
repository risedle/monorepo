import {
    describe,
    test,
    assert,
    beforeEach,
} from "matchstick-as/assembly/index";
import { logStore, clearStore } from "matchstick-as/assembly/store";
import {
    ethereum,
    BigDecimal,
    BigInt,
    Address,
} from "@graphprotocol/graph-ts";

import { loadOrInitializeFactory, loadOrInitializeFLT } from "../src/helpers";
import { FLT, ETHPriceData } from "../generated/schema";
import { createParamsUpdatedEvent, ETHRISE } from "./helpers";
import { handleParamsUpdated } from "../src/swap";

// Contract call mocks
import "./mocks";

beforeEach(() => {
    clearStore(); // <-- clear the store before each test in the file
    // Create dummy factory and FLT first
    createDummy(ETHRISE);
});

function createDummy(tokenAddress: string): void {
    let factory = loadOrInitializeFactory();
    let flt = loadOrInitializeFLT(Address.fromString(tokenAddress));
    let ethPriceData = new ETHPriceData("latest");
    ethPriceData.priceUSD = BigDecimal.fromString("1088.87");
    ethPriceData.blockNumber = BigInt.fromString("1088");
    ethPriceData.timestamp = BigInt.fromString("1088");
    ethPriceData.save();
    factory.save();
    flt.save;
}

describe("handleParamsUpdated", () => {
    test("should update FLT params", () => {
        // Create ParamsUpdated Event
        let event = createParamsUpdatedEvent(ETHRISE);

        handleParamsUpdated(event);
        // logStore();

        // Check params
        let flt = FLT.load(ETHRISE)!;
        assert.stringEquals(flt.minLeverageRatio.toString(), "1.56");
        assert.stringEquals(flt.maxLeverageRatio.toString(), "2.26");
        assert.stringEquals(flt.maxDrift.toString(), "0.34");
        assert.stringEquals(flt.maxIncentive.toString(), "0.197");
        assert.stringEquals(flt.maxSupply.toString(), "123");
    });
});
