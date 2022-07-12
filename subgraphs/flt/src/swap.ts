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
    convertTokenAmountToETH,
    convertTokenToDecimal,
    convertETHToDecimal,
    FACTORY_ADDRESS,
    ONE_BI,
    ZERO_BD,
    loadOrInitializeToken,
    loadOrInitializeUser,
    loadOrInitializeOpenPosition,
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

    // Load or initialize entities
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
    let tokenIn = loadOrInitializeToken(event.params.tokenIn);
    let tokenOut = loadOrInitializeToken(event.params.tokenOut);
    let swaps = transaction.swaps;
    let swapId = transactionId
        .concat("-")
        .concat(BigInt.fromI32(swaps.length).toString());
    let swap = new Swap(swapId);
    let user = loadOrInitializeUser(event.transaction.from);
    let position = loadOrInitializeOpenPosition(user, flt);

    // Derived data from Swap
    let swapAmount = ZERO_BD;
    let swapUSD = ZERO_BD;
    let swapFeeUSD = ZERO_BD;

    // Handle FLT as tokenOut
    if (fltId == event.params.tokenOut.toHexString()) {
        // Get swap amount and the USD value
        swapAmount = convertETHToDecimal(event.params.amountOut);
        let amountOutETH = convertFLTAmountToETH(
            flt.id,
            event.params.amountOut
        );
        swapUSD = amountOutETH.times(ethPriceData.priceUSD);

        // Get swap fee in USD
        let feeAmountETH = convertTokenAmountToETH(
            event.params.tokenIn.toHexString(),
            event.params.feeAmount
        );
        swapFeeUSD = feeAmountETH.times(ethPriceData.priceUSD);

        // Increase total supply
        fltHourData.totalSupply = fltHourData.totalSupply.plus(
            convertETHToDecimal(event.params.amountOut)
        );
        fltDayData.totalSupply = fltDayData.totalSupply.plus(
            convertETHToDecimal(event.params.amountOut)
        );

        // Update swap
        swap.amountIn = convertTokenToDecimal(
            event.params.amountIn,
            tokenIn.decimals
        );
        swap.amountOut = swapAmount;
        let amountInETH = convertTokenAmountToETH(
            event.params.tokenIn.toHexString(),
            event.params.amountIn
        );
        swap.amountInUSD = amountInETH.times(ethPriceData.priceUSD);
        swap.amountOutUSD = swapUSD;
        swap.feeAmount = convertTokenToDecimal(
            event.params.feeAmount,
            tokenIn.decimals
        );
        swap.feeAmountUSD = swapFeeUSD;

        // Update user's open position
        position.amount = position.amount.plus(swapAmount);
        position.amountUSD = position.amountUSD.plus(swapUSD);
    }

    // Handle FLT as tokenIn
    if (fltId == event.params.tokenIn.toHexString()) {
        // Get swap amount and the USD value
        swapAmount = convertETHToDecimal(event.params.amountIn);
        let amountInETH = convertFLTAmountToETH(flt.id, event.params.amountIn);
        swapUSD = amountInETH.times(ethPriceData.priceUSD);

        // Get swap fee in USD
        let feeAmountETH = convertTokenAmountToETH(
            event.params.tokenOut.toHexString(),
            event.params.feeAmount
        );
        swapFeeUSD = feeAmountETH.times(ethPriceData.priceUSD);

        // Increase total supply
        fltHourData.totalSupply = fltHourData.totalSupply.minus(
            convertETHToDecimal(event.params.amountIn)
        );
        fltDayData.totalSupply = fltDayData.totalSupply.minus(
            convertETHToDecimal(event.params.amountIn)
        );

        // Update swap
        swap.amountIn = swapAmount;
        swap.amountOut = convertTokenToDecimal(
            event.params.amountOut,
            tokenOut.decimals
        );
        let amountOutETH = convertTokenAmountToETH(
            event.params.tokenOut.toHexString(),
            event.params.amountOut
        );
        swap.amountInUSD = swapUSD;
        swap.amountOutUSD = amountOutETH.times(ethPriceData.priceUSD);
        swap.feeAmount = convertTokenToDecimal(
            event.params.feeAmount,
            tokenOut.decimals
        );
        swap.feeAmountUSD = swapFeeUSD;

        // Update user's open position
        position.amount = position.amount.minus(swapAmount);
        position.amountUSD = position.amountUSD.minus(swapUSD);
    }

    // Increase volume
    factory.totalVolumeUSD = factory.totalVolumeUSD.plus(swapUSD);
    flt.totalVolume = flt.totalVolume.plus(swapAmount);
    flt.totalVolumeUSD = flt.totalVolumeUSD.plus(swapUSD);
    fltHourData.tradeVolume = fltHourData.tradeVolume.plus(swapAmount);
    fltHourData.tradeVolumeUSD = fltHourData.tradeVolumeUSD.plus(swapUSD);
    fltDayData.tradeVolume = fltDayData.tradeVolume.plus(swapAmount);
    fltDayData.tradeVolumeUSD = fltDayData.tradeVolumeUSD.plus(swapUSD);

    // Increase swap fees
    factory.totalFeeUSD = factory.totalFeeUSD.plus(swapFeeUSD);
    flt.totalFeeUSD = flt.totalFeeUSD.plus(swapFeeUSD);
    fltHourData.tradeFeeUSD = fltHourData.tradeFeeUSD.plus(swapFeeUSD);
    fltDayData.tradeFeeUSD = fltDayData.tradeFeeUSD.plus(swapFeeUSD);

    // Increase trade count
    factory.totalTxns = factory.totalTxns.plus(ONE_BI);
    flt.totalTxns = flt.totalTxns.plus(ONE_BI);
    fltHourData.tradeTxns = fltHourData.tradeTxns.plus(ONE_BI);
    fltDayData.tradeTxns = fltDayData.tradeTxns.plus(ONE_BI);

    swap.transaction = transaction.id;
    swap.timestamp = transaction.timestamp;
    swap.flt = flt.id;
    swaps.push(swapId);
    transaction.swaps = swaps;
    swap.tokenIn = tokenIn.id;
    swap.tokenOut = tokenOut.id;
    swap.user = user.id;
    swap.sender = event.params.sender;
    swap.recipient = event.params.recipient;

    // Persist data
    user.save();
    position.save();
    factory.save();
    fltHourData.save();
    fltDayData.save();
    transaction.save();
    flt.save();
    swap.save();
}
