import { describe, test, assert } from "matchstick-as/assembly/index";
import { logStore } from "matchstick-as/assembly/store";
import {
    ethereum,
    BigInt,
    Address,
    BigDecimal,
} from "@graphprotocol/graph-ts";

import {
    Factory,
    Transaction,
    Swap,
    FLT,
    FLTHourData,
    FLTDayData,
    ETHPriceData,
} from "../generated/schema";
import { createSwapEvent, ETHRISE, USDC, SENDER, RECIPIENT } from "./helpers";
import { handleSwap } from "../src/flt";
import {
    FACTORY_ADDRESS,
    loadOrInitializeFactory,
    loadOrInitializeFLT,
} from "../src/helpers";

// Contract call mocks
import "./mocks";

function createDummy(tokenAddress: string): void {
    let factory = loadOrInitializeFactory();
    let flt = loadOrInitializeFLT(Address.fromString(tokenAddress));
    let ethPriceData = new ETHPriceData("latest");
    ethPriceData.priceUSD = BigDecimal.fromString("231.50854126");
    ethPriceData.save();
    factory.save();
    flt.save();
}

describe("handleSwap", () => {
    describe("given FLT as tokenOut", () => {
        test("should save data correctly", () => {
            // Create dummy factory and FLT first
            createDummy(ETHRISE);

            // Create mock event then call the handler
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(event);
            logStore();

            // Make sure Transaction is saved
            let transactionId = event.transaction.hash.toHexString();
            let transaction = Transaction.load(transactionId)!;
            assert.stringEquals(transaction.id, transactionId);
            assert.bigIntEquals(transaction.blockNumber, event.block.number);
            assert.bigIntEquals(transaction.timestamp, event.block.timestamp);

            // Make sure Swap is populated
            let swapId = transactionId
                .concat("-")
                .concat(BigInt.fromI32(0).toString());
            let swap = Swap.load(swapId)!;
            assert.stringEquals(transaction.swaps![0], swapId);

            // Check basic metadata
            assert.stringEquals(swap.id, swapId);
            assert.stringEquals(swap.transaction, transaction.id);
            assert.bigIntEquals(swap.timestamp, event.block.timestamp);
            assert.stringEquals(swap.flt, ETHRISE);

            let factory = Factory.load(FACTORY_ADDRESS)!;
            let flt = FLT.load(ETHRISE)!;
            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Trade volume should increased
            assert.stringEquals(
                factory.totalVolumeUSD.toString(),
                "6.9452562378"
            );
            assert.stringEquals(flt.totalVolume.toString(), "1");
            assert.stringEquals(flt.totalVolumeUSD.toString(), "6.9452562378");
            assert.stringEquals(fltHourData.tradeVolume.toString(), "1");
            assert.stringEquals(
                fltHourData.tradeVolumeUSD.toString(),
                "6.9452562378"
            );
            assert.stringEquals(fltDayData.tradeVolume.toString(), "1");
            assert.stringEquals(
                fltDayData.tradeVolumeUSD.toString(),
                "6.9452562378"
            );

            // FLT total supply should increased
            // assert.bigIntEquals(
            //    flt.totalSupply,
            //    BigInt.fromString(ethriseTotalSupply).plus(
            //        BigInt.fromString(ethriseAmount)
            //    )
            //);

            // TODO: txcount should increased

            // Check Users metadata
            // assert.stringEquals(swap.sender, ROUTER);
            // assert.stringEquals(swap.recipient, USER);

            // TODO: Sender and recipient swap volume should increased

            // TODO: Load or initialize new token
            // TODO: make sure token trade volume increased
            // TODO: make sure token trade volume usd increased
            // TODO:
            // TODO: make sure factory volume is increased
        });
    });
});
