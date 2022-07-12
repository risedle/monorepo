import { describe, test, assert } from "matchstick-as/assembly/index";
import { logStore } from "matchstick-as/assembly/store";
import { log, BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";

import {
    ETHPriceData,
    FLTHourData,
    FLTDayData,
    FLT,
} from "../generated/schema";
import { handleAnswerUpdated } from "../src/snapshot";
import { createAnswerUpdatedEvent, ETHRISE } from "./helpers";
import { loadOrInitializeFactory, loadOrInitializeFLT } from "../src/helpers";

// Contract calls mocks
import "./mocks";

function createDummyData(): void {
    // Load or initialize factory
    let factory = loadOrInitializeFactory();

    // Load of initialize FLT
    let flt = loadOrInitializeFLT(Address.fromString(ETHRISE));

    // Add FLT to factory
    let newFLTs = factory.flts;
    newFLTs.push(flt.id);
    factory.flts = newFLTs;

    // Persist data
    flt.save();
    factory.save();
}

describe("handleAnswerUpdated", () => {
    describe("given Factory without FLT", () => {
        test("should upsert ETHPriceData only", () => {
            // Create answer updated event
            let event = createAnswerUpdatedEvent("23150854126");
            handleAnswerUpdated(event);
            // logStore();

            // Make sure ETHPriceData is updated
            let snapshot = ETHPriceData.load("latest")!;
            assert.bigIntEquals(snapshot.blockNumber, event.block.number);
            assert.bigIntEquals(snapshot.timestamp, event.block.timestamp);
            assert.stringEquals(snapshot.priceUSD.toString(), "231.50854126");
        });
    });

    describe("given Factory with FLTs", () => {
        test("should upsert ETHPriceData and FLT Snapshot", () => {
            // Create factory and FLT
            createDummyData();

            // Create answer updated event
            let event = createAnswerUpdatedEvent("23150854126");
            handleAnswerUpdated(event);
            // logStore();

            // Make sure ETHPriceData is updated
            let snapshot = ETHPriceData.load("latest")!;
            assert.bigIntEquals(snapshot.blockNumber, event.block.number);
            assert.bigIntEquals(snapshot.timestamp, event.block.timestamp);
            assert.stringEquals(snapshot.priceUSD.toString(), "231.50854126");

            // Make sure FLT hourly snapshot is updated
            let hourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            assert.stringEquals(hourData.flt, ETHRISE);
            assert.stringEquals(
                hourData.priceUSD.toString(),
                "21.261357302524640978878398"
            );
            assert.stringEquals(hourData.totalCollateral.toString(), "0.6");
            assert.stringEquals(hourData.totalDebt.toString(), "700");

            // Make sure FLT daily snapshot is updated
            let dayData = FLTDayData.load(ETHRISE.concat("-0"))!;
            assert.stringEquals(dayData.flt, ETHRISE);
            assert.stringEquals(
                dayData.priceUSD.toString(),
                "21.261357302524640978878398"
            );
            assert.stringEquals(dayData.totalCollateral.toString(), "0.6");
            assert.stringEquals(dayData.totalDebt.toString(), "700");
        });
    });
});
