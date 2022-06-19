import { getSourceTokensByChainId } from "../src/index";
import { ChainId, TokenInfoSource } from "@risedle/types";

describe("getSourceTokensByChainId", () => {
    describe("given unsupported chain id", () => {
        it("should return null", () => {
            let output = getSourceTokensByChainId(123);
            expect(output).toBe(undefined);

            output = getSourceTokensByChainId(ChainId.BSC_TESTNET);
            expect(output).toBe(undefined);
        });
    });

    describe("given BSC chain id", () => {
        it("should return correct values", () => {
            let sourceTokens = getSourceTokensByChainId(ChainId.BSC);

            // Check source tokens
            expect(sourceTokens).toBeDefined();
            expect(
                sourceTokens!.has(TokenInfoSource.PancakeSwapSubgraph)
            ).toBe(true);

            // Check returned tokens
            const tokens = sourceTokens!.get(
                TokenInfoSource.PancakeSwapSubgraph
            );
            expect(tokens).toBeDefined();
            expect(tokens!.length).toBe(2);

            // Get source tokens via integer
            sourceTokens = getSourceTokensByChainId(56);
            expect(sourceTokens).not.toBe(null);
        });
    });
});
