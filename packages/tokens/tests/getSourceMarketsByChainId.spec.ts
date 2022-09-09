import { getSourceMarketsByChainId } from "../src/index";
import { ChainId, TokenInfoSource } from "@risedle/types";

describe("getSourceMarketsByChainId", () => {
    describe("given unsupported chain id", () => {
        it("should return null", () => {
            let output = getSourceMarketsByChainId(123);
            expect(output).toBe(undefined);

            output = getSourceMarketsByChainId(ChainId.BSC_TESTNET);
            expect(output).toBe(undefined);
        });
    });

    describe("given BSC chain id", () => {
        it("should return correct values", () => {
            const sourceMarket = getSourceMarketsByChainId(ChainId.BSC);

            // Check source tokens
            expect(sourceMarket).toBe(
                "https://api.thegraph.com/subgraphs/name/risedle/risedle-flt-bsc"
            );
        });
    });
});
