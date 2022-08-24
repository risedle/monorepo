import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types/chain";
import { GetTokensByChainIdValidation } from "../utils/validationChainId";
import fltsService from "../services/flts";

/**
 * GetFuseLeveragedTokenChartsBySymbol return hourly historical price, daily
 * historical volumes and fees of Fuse Leveraged Token up to 28 days
 */
async function GetFuseLeveragedTokenChartsBySymbol(
    req: Request,
    res: Response
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const charts = await fltsService.getFuseLeveragedTokenChartsBySymbol(
            req.params.chainId as unknown as ChainId,
            req.params.symbol
        );
        if (charts == undefined) {
            return res.status(404).json({
                errors: [
                    {
                        location: "params",
                        msg: "symbol not found",
                        param: "symbol",
                        value: req.params.symbol,
                    },
                ],
            });
        }
        return res.status(200).json(charts);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

/**
 * GetFuseLeveragedTokenBackingsBySymbol return backings history
 */
async function GetFuseLeveragedTokenBackingsBySymbol(
    req: Request,
    res: Response
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const swaps = await fltsService.getFuseLeveragedTokenBackingsBySymbol(
            req.params.chainId as unknown as ChainId,
            req.params.symbol
        );
        if (swaps == undefined) {
            return res.status(404).json({
                errors: [
                    {
                        location: "params",
                        msg: "symbol not found",
                        param: "symbol",
                        value: req.params.symbol,
                    },
                ],
            });
        }
        return res.status(200).json(swaps);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

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

const GetFuseLeveragedTokensByChainIdValidation = GetTokensByChainIdValidation;

const flts = {
    GetFuseLeveragedTokensByChainIdValidation,
    GetFuseLeveragedTokenChartsBySymbol,
    GetFuseLeveragedTokenBackingsBySymbol,
    GetFuseLeveragedTokensGains,
};

export default flts;
