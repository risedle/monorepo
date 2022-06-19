import { getSourceTokensByChainId } from "../src/index";
import { ChainId } from "@risedle/types/chain";
import { TokenInfoSource } from "@risedle/types/token";

describe("getSourceTokensByChainId", () => {
    describe("given unsupported chain id", () => {
        it("should return null", () => {
            let o = getSourceTokensByChainId(123);
            expect(o).toBe(null);

            o = getSourceTokensByChainId(ChainId.BSC_TESTNET);
            expect(o).toBe(null);
        });
    });

    describe("given BSC chain id", () => {
        it("should return correct values", () => {
            let o = getSourceTokensByChainId(ChainId.BSC);
            expect(Object(o).keys()).toStrictEqual([
                TokenInfoSource.PancakeSwapSubgraph,
            ]);
            expect(o[TokenInfoSource.PancakeSwapSubgraph].length).toBe(2);

            o = getSourceTokensByChainId(56);
            expect(Object(o).keys()).toStrictEqual([
                TokenInfoSource.PancakeSwapSubgraph,
            ]);
            expect(o[TokenInfoSource.PancakeSwapSubgraph].length).toBe(2);
        });
    });
});
