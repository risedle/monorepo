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

const tokens = {
    getSourceTokensByChainId,
};

export default tokens;
export * from "./bsc";
