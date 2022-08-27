// Schema
import { Protocol } from "../generated/schema";

// Shared
import { ZERO_BD } from "./numeric";

export function getOrCreateProtocol(
    name: string,
    slug: string,
    chainId: string,
    chainSlug: string,
    chainName: string
): Protocol {
    let protocol = Protocol.load("1");
    if (protocol === null) {
        protocol = new Protocol("1");
        protocol.name = name;
        protocol.slug = slug;
        protocol.chainId = chainId;
        protocol.chainSlug = chainSlug;
        protocol.chainName = chainName;
        protocol.totalValueLockedUSD = ZERO_BD;
        protocol.cumulativeVolumeUSD = ZERO_BD;
        protocol.cumulativeLPRevenueUSD = ZERO_BD;
        protocol.cumulativeProtocolRevenueUSD = ZERO_BD;
        protocol.cumulativeTotalRevenueUSD = ZERO_BD;
        protocol.cumulativeUniqueUsers = 0;
        protocol.totalLiquidityPoolCount = 0;
        protocol.save();
    }
    return protocol;
}
