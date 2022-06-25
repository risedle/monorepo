import { log } from "@graphprotocol/graph-ts";
import { TokenCreated } from "../generated/RiseTokenFactory/RiseTokenFactory";
import { FACTORY_ADDRESS } from "./helpers.ts";

export function handleTokenCreated(event: TokenCreated): void {
    // load factory (create if first token)
    let factory = RiseTokenFactory.load(FACTORY_ADDRESS);
    if (factory === null) {
        factory = new RiseTokenFactory(FACTORY_ADDRESS);
        factory.riseTokenCount = 0;

        factory.totalVolumeUSD = ZERO_BD;
        factory.txCount = ZERO_BI;
    }
    factory.pairCount = factory.pairCount + 1;
    factory.save();
}
