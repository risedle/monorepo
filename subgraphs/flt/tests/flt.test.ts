import { describe, test, assert } from "matchstick-as/assembly/index";
import { logStore } from "matchstick-as/assembly/store";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";

import { Transaction, Swap } from "../generated/schema";
import { createSwapEvent, ETHRISE, USDC } from "./helpers";
import { handleSwap } from "../src/flt";
import { loadOrInitializeFLT } from "../src/helpers";

// Contract call mocks
import "./mocks";

function createDummyFLT(tokenAddress: string): void {
    let flt = loadOrInitializeFLT(Address.fromString(tokenAddress));
    flt.save();
}

describe("handleSwap", () => {
    describe("given FLT as tokenOut", () => {
        test("should save data correctly", () => {
            // Create new FLT first
            createDummyFLT(ETHRISE);

            // Create mock event then call the handler
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                "1000000000000000000", // 1 ETHRISE as amountOut
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
            assert.stringEquals(swap.id, swapId);
            assert.stringEquals(swap.transaction, transaction.id);
            assert.bigIntEquals(swap.timestamp, event.block.timestamp);
            assert.stringEquals(swap.flt, ETHRISE);

            // TODO: check FLT here
        });
    });
});
