import { getFuseLeveragedTokenBySymbol } from "../flts";
import { ChainId } from "@risedle/types";

describe("getFuseLeveragedTokenBySymbol", () => {
    describe("given random chainId", () => {
        it("should throw an error", async () => {
            expect.assertions(1);
            try {
                await getFuseLeveragedTokenBySymbol(1234, "AAA");
            } catch (e) {
                expect(e).toBe("Endpoint not defined for chainId 1234");
            }
        });
    });

    describe("given BSC as chainId", () => {
        describe("given random symbol", () => {
            it("should return undefined", async () => {
                const token = await getFuseLeveragedTokenBySymbol(56, "AAA");
                expect(token).toBeUndefined();
            });
        });

        describe("given BNBDROP & BNBRISE", () => {
            it("should return FuseLeveragedTokenInfo", async () => {
                let token = await getFuseLeveragedTokenBySymbol(56, "BNBDROP");
                expect(token).toBeDefined();
                token = await getFuseLeveragedTokenBySymbol(56, "BNBRISE");
                expect(token).toBeDefined();

                // Make sure it returns array of FuseLeveragedTokenInfo
                expect(token?.name).toEqual("2X Long BNB Risedle");
                expect(token?.symbol).toEqual("BNBRISE");
                expect(token?.decimals).toEqual(18);
                expect(token?.address).toEqual(
                    "0x4f7255178b8f15c2cbe92d09b8a77b53ef4ec9ea"
                );
                expect(token?.priceUSD).toBeGreaterThan(0);
                expect(token?.dailyPriceChangeUSD).toBeTruthy();
                expect(token?.dailyPriceChangePercentage).toBeLessThanOrEqual(
                    100
                );
                expect(
                    token?.dailyPriceChangePercentage
                ).toBeGreaterThanOrEqual(-100);
                expect(token?.totalVolumeUSD).toBeGreaterThan(0);
                expect(token?.dailyVolumeChangeUSD).toBeGreaterThanOrEqual(0);
                expect(token?.dailyVolumeChangePercentage).toBeLessThanOrEqual(
                    100
                );
                expect(
                    token?.dailyVolumeChangePercentage
                ).toBeGreaterThanOrEqual(-100);
                expect(token?.marketcapUSD).toBeGreaterThan(0);
                expect(token?.totalCollateral).toBeGreaterThan(0);
                expect(token?.totalDebt).toBeGreaterThan(0);
                expect(token?.collateral.name).toEqual("Wrapped BNB");
                expect(token?.collateral.symbol).toEqual("WBNB");
                expect(token?.collateral.amount).toBeGreaterThan(0);
                expect(token?.debt.name).toEqual("BUSD Token");
                expect(token?.debt.symbol).toEqual("BUSD");
                expect(token?.debt.amount).toBeGreaterThan(0);
            });
        });
    });
});
