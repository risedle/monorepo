import { getFuseLeveragedTokensByChainId } from "../flts";
import { ChainId } from "@risedle/types";

describe("getFuseLeveragedTokensByChainId", () => {
    describe("given random chainId", () => {
        it("should return empty array", async () => {
            const tokens = await getFuseLeveragedTokensByChainId(1234);
            expect(tokens.length).toEqual(0);
        });
    });

    describe("given BSC as chainId", () => {
        it("should return array of FuseLeveragedTokenInfo", async () => {
            let tokens = await getFuseLeveragedTokensByChainId(56);
            expect(tokens.length).toBeGreaterThan(1);
            tokens = await getFuseLeveragedTokensByChainId(ChainId.BSC);
            expect(tokens.length).toBeGreaterThan(1);

            // Make sure it returns array of FuseLeveragedTokenInfo
            expect(tokens[0].name).toBeTruthy();
            expect(tokens[0].symbol).toBeTruthy();
            expect(tokens[0].decimals).toEqual(18);
            expect(tokens[0].address).toBeTruthy();
            expect(tokens[0].priceUSD).toBeGreaterThan(0);
            expect(typeof tokens[0].dailyPriceChangeUSD).toBe("number");
            expect(tokens[0].dailyPriceChangePercentage).toBeLessThanOrEqual(
                100
            );
            expect(
                tokens[0].dailyPriceChangePercentage
            ).toBeGreaterThanOrEqual(-100);
            expect(tokens[0].totalVolumeUSD).toBeGreaterThan(0);
            expect(typeof tokens[0].dailyVolumeChangeUSD).toBe("number");
            expect(tokens[0].dailyVolumeChangePercentage).toBeLessThanOrEqual(
                100
            );
            expect(
                tokens[0].dailyVolumeChangePercentage
            ).toBeGreaterThanOrEqual(-100);
            expect(tokens[0].marketcapUSD).toBeGreaterThan(0);
            expect(tokens[0].collateral.name).toBeTruthy();
            expect(tokens[0].collateral.symbol).toBeTruthy();
            expect(tokens[0].collateral.amount).toBeGreaterThan(0);
            expect(tokens[0].debt.name).toBeTruthy();
            expect(tokens[0].debt.symbol).toBeTruthy();
            expect(tokens[0].debt.amount).toBeGreaterThan(0);
            expect(tokens[0].totalCollateral).toBeGreaterThan(0);
            expect(tokens[0].totalDebt).toBeGreaterThan(0);
        });
    });
});
