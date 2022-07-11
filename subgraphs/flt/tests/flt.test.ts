import { describe, test, assert } from "matchstick-as/assembly/index";
import { logStore } from "matchstick-as/assembly/store";
import {
    ethereum,
    BigInt,
    Address,
    BigDecimal,
} from "@graphprotocol/graph-ts";

import { Transaction, Swap, FLT } from "../generated/schema";
import { createSwapEvent, ETHRISE, USDC, SENDER, RECIPIENT } from "./helpers";
import { handleSwap } from "../src/flt";
import { loadOrInitializeFLT } from "../src/helpers";

// Contract call mocks
import "./mocks";

function createDummyFLT(tokenAddress: string, totalSupply: string): FLT {
    let flt = loadOrInitializeFLT(Address.fromString(tokenAddress));
    flt.totalSupply = BigInt.fromString(totalSupply);
    flt.save();
    return flt;
}

describe("handleSwap", () => {
    describe("given FLT as tokenOut", () => {
        test("should save data correctly", () => {
            // Create new FLT first
            let ethriseTotalSupply = "1000000000000000000";
            let prevFLT = createDummyFLT(ETHRISE, ethriseTotalSupply);

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

            // Check FLT metadata
            assert.stringEquals(swap.flt, ETHRISE);
            let flt = FLT.load(ETHRISE)!;
            // FLT total supply should increased
            assert.bigIntEquals(
                flt.totalSupply,
                BigInt.fromString(ethriseTotalSupply).plus(
                    BigInt.fromString(ethriseAmount)
                )
            );

            // FLT trade volume should increased
            assert.bigIntEquals(
                flt.tradeVolume,
                prevFLT.tradeVolume.plus(BigInt.fromString(ethriseAmount))
            );

            // FLT trade volume ETH should increased
            // assert.stringEquals(flt.tradeVolumeETH.toString());

            // TODO: FLT trade volume should increased
            // TODO: FLT trade volume ETH should increased
            // TODO: FLT trade volume USD should increased
            // TODO: txcount should increased
            // TODO: fltDailySnapshot should updated
            // TODO: fltHourlySnapshot should be updateed

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
