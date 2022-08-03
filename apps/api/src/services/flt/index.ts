import { ChainId } from "@risedle/types";

import GetFuseLeveragedTokenBySymbol from "./GetFuseLeveragedTokenBySymbol";
import GetFuseLeveragedTokenUserPositionById from "./GetFuseLeveragedTokenUserPositionById";
import GetFuseLeveragedTokenSwapsBySymbol from "./GetFuseLeveragedTokenSwapsBySymbol";

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
    GetFuseLeveragedTokenBySymbol,
    GetFuseLeveragedTokenUserPositionById,
    GetFuseLeveragedTokenSwapsBySymbol,
};

export default services;
