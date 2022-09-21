import type { FuseLeveragedTokens } from "./types";

interface FuseLeveragedTokensSummary {
    totalMarketCap: number;
    totalVolume: number;
}

const getFuseLeveragedTokensSummary = (
    data: FuseLeveragedTokens
): FuseLeveragedTokensSummary => {
    const initial = { totalMarketCap: 0, totalVolume: 0 };
    return data.tokens.reduce((sum, flt) => {
        const totalSupply = parseFloat(flt.dailyData[0].totalSupply);
        const price = parseFloat(flt.dailyData[0].close);
        const mcap = totalSupply * price;
        const tradeVolume = parseFloat(flt.totalVolumeUSD);
        return {
            totalMarketCap: sum.totalMarketCap + mcap,
            totalVolume: sum.totalVolume + tradeVolume,
        };
    }, initial);
};
export default getFuseLeveragedTokensSummary;
