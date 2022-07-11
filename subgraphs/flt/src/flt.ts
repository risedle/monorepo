import { log, BigInt } from "@graphprotocol/graph-ts";
import { Swap as SwapEvent } from "../generated/templates/FLT/FLT";
import { Transaction, Swap, FLT } from "../generated/schema";

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
    let fltId = event.address.toHexString();
    let flt = FLT.load(fltId)!;

    log.debug("fltId: {}", [fltId]);
    log.debug("tokenOut: {}", [event.params.tokenOut.toHexString()]);

    // Handle FLT as tokenOut
    let ethPrice = getETHPrice();
    if (fltId == event.params.tokenOut.toHexString()) {
        // Increase total supply with amountOut
        flt.totalSupply = flt.totalSupply.plus(event.params.amountOut);
        // Update FLT volume
        flt.tradeVolume = flt.tradeVolume.plus(event.params.amountOut);
        // Update FLT volume in USD
        // Get value in ETH
        // Get eth price in USD
        // value on ETH times price in USD
        flt.tradeVolumeUSD = flt.tradeVolumeUSD.plus(
            getUSDFromAmount(fltId, event.params.amountOut)
        );
    }

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
