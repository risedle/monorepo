import { Swap as SwapEvent } from "../generated/templates/FLT/FLT";
import { Transaction, Swap } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleSwap(event: SwapEvent): void {
    // Load or initialize new Transaction
    let transactionId = event.transaction.hash.toHexString();
    let transaction = Transaction.load(transactionId);
    if (transaction === null) {
        transaction = new Transaction(transactionId);
        transaction.blockNumber = event.block.number;
        transaction.timestamp = event.block.timestamp;
        transaction.swaps = [];
    }

    // Initialize new Swap
    let swaps = transaction.swaps;
    if (swaps === null) return;
    let swapId = transactionId
        .concat("-")
        .concat(BigInt.fromI32(swaps.length).toString());
    let swap = Swap.load(swapId);
    if (swap === null) {
        swap = new Swap(swapId);
    }
    swaps.push(swap.id);
    transaction.swaps = swaps;

    // Persist data
    transaction.save();
    swap.save();
}
