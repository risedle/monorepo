import { ChainId } from "@risedle/types";

const GetFuseLeveragedTokensGains = (chainId: ChainId) => {
    if (chainId) {
        return [
            {
                symbol: "BNBRISE",
                name: "2x Long BNB Risedle",
                dailyGain: {
                    timestamp: 1657868400,
                    gain: 4.12,
                },
                weeklyGain: {
                    timestampStart: 1657868400,
                    timestampEnd: 1657868401,
                    gain: 10.22,
                },
            },
            {
                symbol: "CAKERISE",
                name: "2x Long CAKE Risedle",
                dailyGain: {
                    timestamp: 1657868400,
                    gain: 4.12,
                },
                weeklyGain: {
                    timestampStart: 1657868400,
                    timestampEnd: 1657868401,
                    gain: 10.22,
                },
            },
        ];
    }
    return;
};

export default GetFuseLeveragedTokensGains;
