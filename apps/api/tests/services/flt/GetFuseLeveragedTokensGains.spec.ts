import flt from "../../../src/services/flt";

describe("GetFuseLeveragedTokensGains()", () => {
    describe("given random chainId", () => {
        it("should throw an error", async () => {
            expect.assertions(1);
            try {
                await flt.GetFuseLeveragedTokensGains(1234);
            } catch (e) {
                expect(e).toBe("Endpoint not defined for chainId 1234");
            }
        });
    });

    describe("given BSC as chainId", () => {
        it("should return array of FuseLeveragedTokenGains", async () => {
            const tokensGain = await flt.GetFuseLeveragedTokensGains(56);
            expect(tokensGain).toBeDefined();
            if (tokensGain == null) return;

            for (const tokenGain of tokensGain) {
                expect(typeof tokenGain.symbol).toBe("string");
                expect(typeof tokenGain.name).toBe("string");

                // Daily Gain
                expect(typeof tokenGain.dailyGain.timestamp).toBe("number");
                expect(tokenGain.dailyGain.timestamp).toBeGreaterThan(10000);
                // dailyGain percentage can drop max 100% but can increase with no limit (e.g. 999%)
                expect(tokenGain.dailyGain.gain).toBeGreaterThanOrEqual(-100);

                // Weekly Gain
                expect(typeof tokenGain.weeklyGain.timestampStart).toBe(
                    "number"
                );
                expect(tokenGain.weeklyGain.timestampStart).toBeGreaterThan(
                    10000
                );
                expect(typeof tokenGain.weeklyGain.timestampEnd).toBe(
                    "number"
                );
                expect(tokenGain.weeklyGain.timestampEnd).toBeGreaterThan(
                    10000
                );
                // weeklyGain percentage can drop max 100% but can increase with no limit (e.g. 999%)
                expect(tokenGain.weeklyGain.gain).toBeGreaterThanOrEqual(-100);
            }
        });
    });
});
