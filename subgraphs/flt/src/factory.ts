import { TokenCreated } from "../generated/Factory/FLTFactory";
import { FLT as FLTTemplate } from "../generated/templates";

import {
    loadOrInitializeFactory,
    loadOrInitializeFLT,
    ONE_BI,
} from "./helpers";

export function handleTokenCreated(event: TokenCreated): void {
    let factory = loadOrInitializeFactory();
    factory.fltCount = factory.fltCount.plus(ONE_BI);
    let flt = loadOrInitializeFLT(event.params.token);
    let flts = factory.flts;
    if (flts === null) {
        flts = [];
    }
    flts.push(flt.id);
    factory.flts = flts;

    // Create the tracked contract based on the template
    FLTTemplate.create(event.params.token);

    flt.save();
    factory.save();
}
