import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types";

async function GetFuseLeveragedTokensGains(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    const getDummyGains = (chainId: ChainId) => {
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
    try {
        const gains = getDummyGains(req.params.chainId as unknown as ChainId);
        return res.status(200).json(gains);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

export default GetFuseLeveragedTokensGains;
