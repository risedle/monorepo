import { getFuseLeveragedTokenSwapsBySymbol } from "../flts";
import { ChainId } from "@risedle/types";

describe("getFuseLeveragedTokenSwapsBySymbol", () => {
    describe("given random chainId", () => {
        it("should throw an error", async () => {
            expect.assertions(1);
            try {
                await getFuseLeveragedTokenSwapsBySymbol(
                    1234,
                    "AAA",
                    undefined
                );
            } catch (e) {
                expect(e).toBe("Endpoint not defined for chainId 1234");
            }
        });
    });

    describe("given BSC as chainId", () => {
        describe("given random symbol", () => {
            it("should return undefined", async () => {
                const swaps = await getFuseLeveragedTokenSwapsBySymbol(
                    56,
                    "AAA",
                    undefined
                );
                expect(swaps).toBeUndefined();
            });
        });

        describe("given BNBRISE without userAddress", () => {
            it("should return array of FuseLeveragedTokenPrice", async () => {
                let swaps = await getFuseLeveragedTokenSwapsBySymbol(
                    56,
                    "BNBRISE",
                    undefined
                );
                expect(swaps?.flt.length).toBeGreaterThanOrEqual(1);
                expect(swaps?.user.length).toBe(0);

                // Make sure it returns array of FuseLeveragedTokenSwap
                const fltSwaps = swaps?.flt!;
                expect(fltSwaps[0].timestamp).toBeGreaterThan(10000);
                expect(typeof fltSwaps[0].hash).toBe("string");
                expect(fltSwaps[0].hash.length).toBe(66);
                expect(typeof fltSwaps[0].user).toBe("string");
                expect(fltSwaps[0].user.length).toBe(42);
                expect(typeof fltSwaps[0].tokenIn.name).toBe("string");
                expect(typeof fltSwaps[0].tokenIn.symbol).toBe("string");
                expect(typeof fltSwaps[0].amountIn).toBe("number");
                expect(typeof fltSwaps[0].amountInUSD).toBe("number");
                expect(typeof fltSwaps[0].tokenOut.name).toBe("string");
                expect(typeof fltSwaps[0].tokenOut.symbol).toBe("string");
                expect(typeof fltSwaps[0].amountOut).toBe("number");
                expect(typeof fltSwaps[0].amountOutUSD).toBe("number");

                // Check user swaps
                const userSwaps = swaps?.user!;
                expect(userSwaps.length).toBe(0);
            });
        });

        describe("given BNBRISE with userAddress", () => {
            it("should return array of FuseLeveragedTokenPrice", async () => {
                const addy = "0x1418be4753a22b69b613fa8b8144d856c023d46b";
                let swaps = await getFuseLeveragedTokenSwapsBySymbol(
                    56,
                    "BNBRISE",
                    addy
                );
                expect(swaps?.flt.length).toBeGreaterThanOrEqual(1);
                expect(swaps?.user.length).toBeGreaterThanOrEqual(1);

                // Make sure it returns array of FuseLeveragedTokenSwap
                const fltSwaps = swaps?.flt!;
                expect(fltSwaps[0].timestamp).toBeGreaterThan(10000);
                expect(typeof fltSwaps[0].hash).toBe("string");
                expect(fltSwaps[0].hash.length).toBe(66);
                expect(typeof fltSwaps[0].user).toBe("string");
                expect(fltSwaps[0].user.length).toBe(42);
                expect(typeof fltSwaps[0].tokenIn.name).toBe("string");
                expect(typeof fltSwaps[0].tokenIn.symbol).toBe("string");
                expect(typeof fltSwaps[0].amountIn).toBe("number");
                expect(typeof fltSwaps[0].amountInUSD).toBe("number");
                expect(typeof fltSwaps[0].tokenOut.name).toBe("string");
                expect(typeof fltSwaps[0].tokenOut.symbol).toBe("string");
                expect(typeof fltSwaps[0].amountOut).toBe("number");
                expect(typeof fltSwaps[0].amountOutUSD).toBe("number");

                // Check user swaps; Make sure it returns Swap data
                const userSwaps = swaps?.user!;
                expect(userSwaps[0].timestamp).toBeGreaterThan(10000);
                expect(typeof userSwaps[0].hash).toBe("string");
                expect(userSwaps[0].hash.length).toBe(66);
                expect(typeof userSwaps[0].user).toBe("string");
                expect(userSwaps[0].user.length).toBe(42);
                expect(userSwaps[0].user).toBe(addy);
                expect(typeof userSwaps[0].tokenIn.name).toBe("string");
                expect(typeof userSwaps[0].tokenIn.symbol).toBe("string");
                expect(typeof userSwaps[0].amountIn).toBe("number");
                expect(typeof userSwaps[0].amountInUSD).toBe("number");
                expect(typeof userSwaps[0].tokenOut.name).toBe("string");
                expect(typeof userSwaps[0].tokenOut.symbol).toBe("string");
                expect(typeof userSwaps[0].amountOut).toBe("number");
                expect(typeof userSwaps[0].amountOutUSD).toBe("number");
            });
        });
    });
});
