import { Swap as SwapEvent } from "../generated/templates/FLT/FLT";
import { Transaction, Swap, FLT } from "../generated/schema";
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

    // Load FLT; otherwise revert
    let flt = FLT.load(event.address.toHexString())!;
    // TODO: Update FLT data here

    // Initialize new Swap
    let swaps = transaction.swaps!;
    let swapId = transactionId
        .concat("-")
        .concat(BigInt.fromI32(swaps.length).toString());
    let swap = new Swap(swapId);
    swap.transaction = transaction.id;
    swap.timestamp = transaction.timestamp;
    swap.flt = flt.id;
    swaps.push(swapId);
    transaction.swaps = swaps;

    // Persist data
    transaction.save();
    flt.save();
    swap.save();
}
