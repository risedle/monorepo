import { getFuseLeveragedTokenChartsBySymbol } from "../flts";
import { ChainId } from "@risedle/types";

describe("getFuseLeveragedTokenChartsBySymbol", () => {
    describe("given random chainId", () => {
        it("should return undefined", async () => {
            const charts = await getFuseLeveragedTokenChartsBySymbol(
                1234,
                "AAA"
            );
            expect(charts).toBeUndefined();
        });
    });

    describe("given BSC as chainId", () => {
        describe("given random symbol", () => {
            it("should return undefined", async () => {
                const charts = await getFuseLeveragedTokenChartsBySymbol(
                    56,
                    "AAA"
                );
                expect(charts).toBeUndefined();
            });
        });

        describe("given BNBDROP & BNBRISE", () => {
            it("should return array of FuseLeveragedTokenPrice", async () => {
                let charts = await getFuseLeveragedTokenChartsBySymbol(
                    56,
                    "BNBDROP"
                );
                expect(charts?.prices.length).toBeGreaterThan(24);
                expect(charts?.volumes.length).toBeGreaterThan(2);
                expect(charts?.fees.length).toBeGreaterThan(2);

                charts = await getFuseLeveragedTokenChartsBySymbol(
                    56,
                    "BNBRISE"
                );
                expect(charts?.prices.length).toBeGreaterThan(24);
                expect(charts?.volumes.length).toBeGreaterThan(2);
                expect(charts?.fees.length).toBeGreaterThan(2);

                // Make sure it returns array of FuseLeveragedTokenPrice
                const price = charts?.prices[0];
                expect(price?.timestamp).toBeGreaterThan(10000);
                expect(typeof price?.open).toBe("number");
                expect(typeof price?.high).toBe("number");
                expect(typeof price?.low).toBe("number");
                expect(typeof price?.close).toBe("number");

                // Make sure it returns array of FuseLeveragedTokenVolume
                const volume = charts?.volumes[0];
                expect(volume?.timestamp).toBeGreaterThan(10000);
                expect(typeof volume?.usd).toBe("number");

                // Make sure it returns array of FuseLeveragedTokenFee
                const fee = charts?.fees[0];
                expect(fee?.timestamp).toBeGreaterThan(10000);
                expect(typeof fee?.usd).toBe("number");
            });
        });
    });
});
