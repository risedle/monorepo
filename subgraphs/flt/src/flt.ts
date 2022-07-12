import { log, BigInt } from "@graphprotocol/graph-ts";
import { Swap as SwapEvent } from "../generated/templates/FLT/FLT";
import {
    Factory,
    Transaction,
    Swap,
    FLT,
    ETHPriceData,
} from "../generated/schema";
import {
    updateFLTHourData,
    updateFLTDayData,
    convertFLTAmountToETH,
    convertETHToDecimal,
    FACTORY_ADDRESS,
} from "./helpers";

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

    let factory = Factory.load(FACTORY_ADDRESS)!;
    let fltId = event.address.toHexString();
    let ethPriceData = ETHPriceData.load("latest")!;
    let flt = FLT.load(fltId)!;
    let fltHourData = updateFLTHourData(
        fltId,
        ethPriceData,
        event.block.timestamp
    );
    let fltDayData = updateFLTDayData(
        fltId,
        ethPriceData,
        event.block.timestamp
    );

    // Handle FLT as tokenOut
    if (fltId == event.params.tokenOut.toHexString()) {
        // Update trade volume
        let amountOut = convertETHToDecimal(event.params.amountOut);
        let amountOutETH = convertFLTAmountToETH(
            flt.id,
            event.params.amountOut
        );
        let amountOutUSD = amountOutETH.times(ethPriceData.priceUSD);
        factory.totalVolumeUSD = factory.totalVolumeUSD.plus(amountOutUSD);
        flt.totalVolume = flt.totalVolume.plus(amountOut);
        flt.totalVolumeUSD = flt.totalVolumeUSD.plus(amountOutUSD);
        fltHourData.tradeVolume = fltHourData.tradeVolume.plus(amountOut);
        fltHourData.tradeVolumeUSD =
            fltHourData.tradeVolumeUSD.plus(amountOutUSD);
        fltDayData.tradeVolume = fltDayData.tradeVolume.plus(amountOut);
        fltDayData.tradeVolumeUSD =
            fltDayData.tradeVolumeUSD.plus(amountOutUSD);

        // TODO: update total supply in hourly and daily
    }

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
    factory.save();
    fltHourData.save();
    fltDayData.save();
    transaction.save();
    flt.save();
    swap.save();
}
