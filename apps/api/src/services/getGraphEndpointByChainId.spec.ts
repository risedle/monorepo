import { getGraphEndpointByChainId } from "./flts";
import { ChainId } from "@risedle/types";

describe("getGraphEndpointByChainId", () => {
    describe("given random chainId", () => {
        it("should return undefined", () => {
            const endpoint = getGraphEndpointByChainId(1234);
            expect(endpoint).toBeUndefined();
        });
    });

    describe("given BSC as chainId", () => {
        it("should return correct endpoint", () => {
            // prettier-ignore
            const expected = "https://api.thegraph.com/subgraphs/name/risedle/risedle-flt-bsc";
            let endpoint = getGraphEndpointByChainId(56);
            expect(endpoint).toEqual(expected);
            endpoint = getGraphEndpointByChainId(ChainId.BSC);
            expect(endpoint).toEqual(expected);
        });
    });
});
