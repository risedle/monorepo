import flt from "../../../src/services/flt";

describe("GetFuseLeveragedTokenBackingsBySymbol", () => {
    describe("given random chainId", () => {
        it("should throw an error", async () => {
            expect.assertions(1);
            try {
                await flt.GetFuseLeveragedTokenBackingsBySymbol(1234, "AAA");
            } catch (e) {
                expect(e).toBe("Endpoint not defined for chainId 1234");
            }
        });
    });

    describe("given BSC as chainId", () => {
        describe("given random symbol", () => {
            it("should return undefined", async () => {
                const backings =
                    await flt.GetFuseLeveragedTokenBackingsBySymbol(56, "AAA");
                expect(backings).toBeUndefined();
            });
        });

        describe("given BNBDROP & BNBRISE", () => {
            it("should return array of FuseLeveragedTokenBacking", async () => {
                let backings = await flt.GetFuseLeveragedTokenBackingsBySymbol(
                    56,
                    "BNBDROP"
                );
                expect(backings?.backings.length).toBeGreaterThan(2);

                backings = await flt.GetFuseLeveragedTokenBackingsBySymbol(
                    56,
                    "BNBRISE"
                );
                expect(backings?.backings.length).toBeGreaterThan(2);

                // Make sure it returns array of FuseLeveragedTokenPrice
                const backing = backings?.backings[0];
                expect(backing?.timestamp).toBeGreaterThan(10000);
                expect(typeof backing?.collateralPerShare).toBe("number");
                expect(typeof backing?.debtPerShare).toBe("number");
                expect(typeof backing?.valueUSD).toBe("number");
            });
        });
    });
});
