import { getGraphEndpointByChainId } from "../flts";
import { ChainId } from "@risedle/types";

describe("getGraphEndpointByChainId", () => {
    describe("given random chainId", () => {
        it("should throw an error", () => {
            expect.assertions(1);
            try {
                getGraphEndpointByChainId(1234);
            } catch (e) {
                expect(e).toBe("Endpoint not defined for chainId 1234");
            }
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
