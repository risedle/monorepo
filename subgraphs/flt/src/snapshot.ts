import { log, BigInt } from "@graphprotocol/graph-ts";
import {
    AccessControlledOffchainAggregator,
    AnswerUpdated,
} from "../generated/AccessControlledOffchainAggregator/AccessControlledOffchainAggregator";
import { ETHPriceData } from "../generated/schema";
import {
    convertTokenToDecimal,
    loadOrInitializeFactory,
    updateFLTHourData,
    updateFLTDayData,
} from "./helpers";

export function handleAnswerUpdated(event: AnswerUpdated): void {
    // Load or initialize new latest snapshot
    let ethPriceData = ETHPriceData.load("latest");
    if (ethPriceData === null) {
        ethPriceData = new ETHPriceData("latest");
    }

    // Get chainlink decimals
    let contract = AccessControlledOffchainAggregator.bind(event.address);
    let decimals = BigInt.fromI32(contract.decimals());
    ethPriceData.priceUSD = convertTokenToDecimal(
        event.params.current,
        decimals
    );
    ethPriceData.blockNumber = event.block.number;
    ethPriceData.timestamp = event.block.timestamp;

    // Load or initialize factory
    let factory = loadOrInitializeFactory();
    if (factory.fltCount.gt(BigInt.fromI32(0))) {
        for (let i = 0; BigInt.fromI32(i).lt(factory.fltCount); ++i) {
            let fltId = factory.flts[i];
            updateFLTHourData(fltId, ethPriceData, event.block.timestamp);
            updateFLTDayData(fltId, ethPriceData, event.block.timestamp);
        }
    }

    // Persist data
    ethPriceData.save();
    factory.save();
}
