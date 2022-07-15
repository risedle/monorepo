import { getFuseLeveragedTokenPricesBySymbol } from "../flts";
import { ChainId } from "@risedle/types";

describe("getFuseLeveragedTokenPricesBySymbol", () => {
    describe("given random chainId", () => {
        it("should return undefined", async () => {
            const prices = await getFuseLeveragedTokenPricesBySymbol(
                1234,
                "AAA"
            );
            expect(prices).toBeUndefined();
        });
    });

    describe("given BSC as chainId", () => {
        describe("given random symbol", () => {
            it("should return undefined", async () => {
                const prices = await getFuseLeveragedTokenPricesBySymbol(
                    56,
                    "AAA"
                );
                expect(prices).toBeUndefined();
            });
        });

        describe("given BNBDROP & BNBRISE", () => {
            it("should return array of FuseLeveragedTokenPrice", async () => {
                let prices = await getFuseLeveragedTokenPricesBySymbol(
                    56,
                    "BNBDROP"
                );
                expect(prices?.length).toBeGreaterThan(24);
                prices = await getFuseLeveragedTokenPricesBySymbol(
                    56,
                    "BNBRISE"
                );
                expect(prices?.length).toBeGreaterThan(24);

                // Make sure it returns array of FuseLeveragedTokenPrice
                const price = prices?.at(0);
                expect(price?.timestamp).toBeGreaterThan(10000);
                expect(typeof price?.open).toBe("number");
                expect(typeof price?.high).toBe("number");
                expect(typeof price?.low).toBe("number");
                expect(typeof price?.close).toBe("number");
            });
        });
    });
});
