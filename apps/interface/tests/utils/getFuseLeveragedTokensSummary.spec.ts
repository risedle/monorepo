import { getFuseLeveragedTokensSummary } from "@/utils/getFuseLeveragedTokensSummary";

describe("getFuseLeveragedTokensSummary", () => {
    it("should return summary", () => {
        const summary = getFuseLeveragedTokensSummary({
            tokens: [
                {
                    dailyData: [
                        {
                            close: 10,
                            totalSupply: 10,
                            tradeVolumeUSD: 20,
                        },
                        {
                            close: 20,
                            totalSupply: 20,
                            tradeVolumeUSD: 30,
                        },
                    ],
                },
                {
                    dailyData: [
                        {
                            close: 10,
                            totalSupply: 10,
                            tradeVolumeUSD: 20,
                        },
                        {
                            close: 20,
                            totalSupply: 20,
                            tradeVolumeUSD: 30,
                        },
                    ],
                },
            ],
        });

        expect(summary.totalMarketCap).toBe(200);
        expect(summary.totalVolume).toBe(40);
    });
});
