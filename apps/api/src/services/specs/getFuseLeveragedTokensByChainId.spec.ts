import { getFuseLeveragedTokensByChainId } from "../flts";
import { ChainId } from "@risedle/types";

describe("getFuseLeveragedTokensByChainId", () => {
    describe("given random chainId", () => {
        it("should throw exception", async () => {
            expect.assertions(1);
            try {
                await getFuseLeveragedTokensByChainId(1234);
            } catch (e) {
                expect(e).toEqual("Endpoint not defined for chainId 1234");
            }
        });
    });

    describe("given BSC as chainId", () => {
        it("should return array of FuseLeveragedTokenInfo", async () => {
            let flts = await getFuseLeveragedTokensByChainId(56);
            expect(flts.tokens.length).toBeGreaterThan(1);
            flts = await getFuseLeveragedTokensByChainId(ChainId.BSC);
            expect(flts.tokens.length).toBeGreaterThan(1);

            // Make sure it returns array of FuseLeveragedTokenInfo
            expect(flts.tokens[0].name).toBeTruthy();
            expect(flts.tokens[0].symbol).toBeTruthy();
            expect(flts.tokens[0].decimals).toEqual(18);
            expect(flts.tokens[0].address).toBeTruthy();
            expect(flts.tokens[0].priceUSD).toBeGreaterThan(0);
            expect(typeof flts.tokens[0].dailyPriceChangeUSD).toBe("number");
            expect(
                flts.tokens[0].dailyPriceChangePercentage
            ).toBeLessThanOrEqual(100);
            expect(
                flts.tokens[0].dailyPriceChangePercentage
            ).toBeGreaterThanOrEqual(-100);
            expect(flts.tokens[0].totalVolumeUSD).toBeGreaterThan(0);
            expect(typeof flts.tokens[0].dailyVolumeChangeUSD).toBe("number");
            expect(
                flts.tokens[0].dailyVolumeChangePercentage
            ).toBeLessThanOrEqual(100);
            expect(
                flts.tokens[0].dailyVolumeChangePercentage
            ).toBeGreaterThanOrEqual(-100);
            expect(flts.tokens[0].marketcapUSD).toBeGreaterThan(0);
            expect(flts.tokens[0].collateral.name).toBeTruthy();
            expect(flts.tokens[0].collateral.symbol).toBeTruthy();
            expect(flts.tokens[0].collateral.amount).toBeGreaterThan(0);
            expect(flts.tokens[0].debt.name).toBeTruthy();
            expect(flts.tokens[0].debt.symbol).toBeTruthy();
            expect(flts.tokens[0].debt.amount).toBeGreaterThan(0);
            expect(flts.tokens[0].totalCollateral).toBeGreaterThan(0);
            expect(flts.tokens[0].totalDebt).toBeGreaterThan(0);
        });
    });
});
