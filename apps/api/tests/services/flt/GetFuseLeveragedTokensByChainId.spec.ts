import flt from "../../src/services/flt";

describe("GetFuseLeveragedTokensByChainId()", () => {
    describe("given random chainId", () => {
        it("should throw an error", async () => {
            expect.assertions(1);
            try {
                await flt.GetFuseLeveragedTokensByChainId(1234);
            } catch (e) {
                expect(e).toBe("Endpoint not defined for chainId 1234");
            }
        });
    });

    describe("given BSC as chainId", () => {
        it("should return array of FuseLeveragedTokenInfo", async () => {
            const infos = await flt.GetFuseLeveragedTokensByChainId(56);
            expect(infos).toBeDefined();
            if (infos == null) return;
            const { tokens } = infos;
            expect(tokens.length).toBeGreaterThan(2);

            // Make sure it returns array of FuseLeveragedTokenInfo
            for (const token of tokens) {
                expect(typeof token.name).toBe("string");
                expect(typeof token.symbol).toBe("string");
                expect(token.decimals).toEqual(18);
                expect(token.address.length).toEqual(42);
                expect(token.priceUSD).toBeGreaterThan(0);
                expect(typeof token.dailyPriceChangeUSD).toBe("number");
                expect(token.dailyPriceChangePercentage).toBeLessThanOrEqual(
                    100
                );
                expect(
                    token.dailyPriceChangePercentage
                ).toBeGreaterThanOrEqual(-100);
                expect(token.totalVolumeUSD).toBeGreaterThan(0);
                expect(
                    token.dailyVolumeChangePercentage
                ).toBeGreaterThanOrEqual(-100);
                expect(token.marketcapUSD).toBeGreaterThan(0);
                expect(token.maxMarketcapUSD).toBeGreaterThan(0);
                expect(token.totalCollateral).toBeGreaterThan(0);
                expect(token.totalDebt).toBeGreaterThan(0);

                expect(typeof token.collateral.name).toBe("string");
                expect(typeof token.collateral.symbol).toBe("string");
                expect(token.collateral.amount).toBeGreaterThan(0);
                expect(token.collateral.decimals).toBeGreaterThan(0);
                expect(typeof token.collateral.change).toBe("number");
                expect(token.collateral.changePercent).toBeGreaterThan(-100);
                expect(token.collateral.changePercent).toBeLessThan(100);

                expect(typeof token.debt.name).toBe("string");
                expect(typeof token.debt.symbol).toBe("string");
                expect(token.debt.amount).toBeGreaterThan(0);
                expect(token.debt.decimals).toBeGreaterThan(0);
                expect(typeof token.debt.change).toBe("number");
                expect(token.debt.changePercent).toBeGreaterThan(-100);
                expect(token.debt.changePercent).toBeLessThan(100);
            }
        });
    });
});
