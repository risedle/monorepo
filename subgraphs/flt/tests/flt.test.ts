import { describe, test, assert } from "matchstick-as/assembly/index";
import { logStore } from "matchstick-as/assembly/store";
import { ethereum, BigInt } from "@graphprotocol/graph-ts";

import { Transaction, Swap } from "../generated/schema";
import { createSwapEvent, BNBRISE, BUSD } from "./helpers";
import { handleSwap } from "../src/flt";

describe("handleSwap", () => {
    describe("given FLT as tokenOut", () => {
        test("should save data correctly", () => {
            // Create mock event then call the handler
            let event = createSwapEvent(
                BUSD,
                BNBRISE,
                "10000000000000000000", // 10 BUSD as amountIn
                "1000000000000000000", // 1 BNBRISE as amountOut
                "100000000000000000", // 0.1 BUSD as feeAmount
                "30000000000000000" // BNBRISE price in BNB
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
            assert.stringEquals(transaction.swaps![0], swapId);
            assert.fieldEquals("Swap", swapId, "id", swapId);
        });
    });
});
