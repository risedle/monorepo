import { ChainId, SourceTokens } from "@risedle/types";
import { BSC_SOURCETOKENS } from "./bsc";

// Get source tokens by Chain Id
export function getSourceTokensByChainId(
    chainId: ChainId
): SourceTokens | undefined {
    switch (chainId) {
        case ChainId.BSC:
            return BSC_SOURCETOKENS;
        default:
            return undefined;
    }
}

export function getUrlGraphByChainId(chainId: ChainId): string {
    switch (chainId) {
        case ChainId.BSC:
            return "https://api.thegraph.com/subgraphs/name/risedle/risedle-flt-bsc";
        default:
            return "";
    }
}

const tokens = {
    getSourceTokensByChainId,
    getUrlGraphByChainId,
};

export default tokens;
export * from "./bsc";
