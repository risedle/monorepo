import { isChainIdSupported } from "../src/index";
import { ChainId } from "@risedle/types/chain";

describe("isChainIdSupported", () => {
    describe("given unsupported tokenId", () => {
        it("should return false", () => {
            let chainId = 1212;
            expect(isChainIdSupported(chainId)).toBe(false);

            chainId = ChainId.BSC_TESTNET;
            expect(isChainIdSupported(chainId)).toBe(false);
        });
    });

    describe("given supported tokenId", () => {
        it("should return true", () => {
            let chainId = 56;
            expect(isChainIdSupported(chainId)).toBe(true);

            let chainIdString = "56";
            expect(isChainIdSupported(chainId)).toBe(true);

            chainId = ChainId.BSC;
            expect(isChainIdSupported(chainId)).toBe(true);
        });
    });
});
