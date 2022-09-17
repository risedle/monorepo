import { TokenInfoSource, SourceTokens } from "@risedle/types";

export const BSC_SOURCETOKENS: SourceTokens = new Map<
    TokenInfoSource,
    Array<string>
>();
// All token address from PancakeSwap Subgraph must be in lower-case

BSC_SOURCETOKENS.set(TokenInfoSource.PancakeSwapSubgraph, [
    // BUSD
    "0xe9e7cea3dedca5984780bafc599bd69add087d56",

    // USDC
    "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
]);

const bsc = {
    BSC_SOURCETOKENS,
};

export default bsc;
