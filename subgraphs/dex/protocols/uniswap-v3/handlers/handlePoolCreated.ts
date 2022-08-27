import { PoolCreated } from "../../../generated/Factory/Factory";

import { getOrCreateProtocol } from "../../../shared/getOrCreateProtocol";
import { getOrCreateToken } from "../../../shared/getOrCreateToken";

// This contant is generated via npm run constgen
import * as protocolInfo from "../../../generated/protocol";

export function handlePoolCreated(event: PoolCreated): void {
    // Get or create Protocol
    let protocol = getOrCreateProtocol(
        protocolInfo.NAME,
        protocolInfo.SLUG,
        protocolInfo.CHAIN_ID,
        protocolInfo.CHAIN_SLUG,
        protocolInfo.CHAIN_NAME
    );

    // Get or create new tokens
    let token0 = getOrCreateToken(event.params.token0, protocol);
    let token1 = getOrCreateToken(event.params.token1, protocol);
}
