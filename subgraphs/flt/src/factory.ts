import { TokenCreated } from "../generated/Factory/FLTFactory";
import { FLT as FLTTemplate } from "../generated/templates";

import { loadOrInitializeFactory, loadOrInitializeFLT } from "./helpers";

export function handleNewFLT(event: TokenCreated): void {
    let factory = loadOrInitializeFactory();
    factory.fltCount = factory.fltCount + 1;
    let flt = loadOrInitializeFLT(event.params.token);

    // Create the tracked contract based on the template
    FLTTemplate.create(event.params.token);

    factory.save();
    flt.save();
}
