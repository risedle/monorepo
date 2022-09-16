import { ChainId } from "@risedle/types";

import GetFuseLeveragedTokensByChainId from "./GetFuseLeveragedTokensByChainId";
import GetFuseLeveragedTokenBySymbol from "./GetFuseLeveragedTokenBySymbol";
import GetFuseLeveragedTokenUserPositionById from "./GetFuseLeveragedTokenUserPositionById";
import GetFuseLeveragedTokenSwapsBySymbol from "./GetFuseLeveragedTokenSwapsBySymbol";
import GetFuseLeveragedTokensGains from "./GetFuseLeveragedTokensGains";
import GetFuseLeveragedTokenBackingsBySymbol from "./GetFuseLeveragedTokenBackingsBySymbol";
import GetFuseLeveragedTokenChartsBySymbol from "./GetFuseLeveragedTokenChartsBySymbol";

// prettier-ignore
const BSC_GRAPH = "https://api.thegraph.com/subgraphs/name/risedle/risedle-flt-bsc";

/**
 * Given Chain ID, return The Graph endpoint
 */
export function getGraphEndpointByChainId(chainId: ChainId): string {
    switch (chainId) {
        case ChainId.BSC:
            return BSC_GRAPH;
        default:
            throw "Endpoint not defined for chainId " + chainId;
    }
}

const services = {
    GetFuseLeveragedTokensByChainId,
    GetFuseLeveragedTokenBySymbol,
    GetFuseLeveragedTokenUserPositionById,
    GetFuseLeveragedTokenSwapsBySymbol,
    GetFuseLeveragedTokensGains,
    GetFuseLeveragedTokenBackingsBySymbol,
    GetFuseLeveragedTokenChartsBySymbol,
};

export default services;
