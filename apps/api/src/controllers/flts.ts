import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types/chain";
import { GetTokensByChainIdValidation } from "../utils/validationChainId";
import fltsService from "../services/flts";

/**
 * GetFuseLeveragedTokensByChainId return list of Fuse Leveraged Tokens
 */
async function GetFuseLeveragedTokensByChainId(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const flts = await fltsService.getFuseLeveragedTokensByChainId(
            req.params.chainId as unknown as ChainId
        );
        return res.status(200).json(flts);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

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
 * GetFuseLeveragedTokenSwapsBySymbol return swap activities
 */
async function GetFuseLeveragedTokenSwapsBySymbol(
    req: Request,
    res: Response
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const swaps = await fltsService.getFuseLeveragedTokenSwapsBySymbol(
            req.params.chainId as unknown as ChainId,
            req.params.symbol,
            req.query.userAddress as unknown as string
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

/**
 * GetUserPositionById return user position
 */
async function GetUserPositionById(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const position = await fltsService.getUserPositionById(
            req.params.chainId as unknown as ChainId,
            req.params.positionId
        );
        if (position == undefined) {
            return res.status(404).json({
                errors: [
                    {
                        location: "params",
                        msg: "positionId not found",
                        param: "positionId",
                        value: req.params.positionId,
                    },
                ],
            });
        }
        return res.status(200).json(position);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

const GetFuseLeveragedTokensByChainIdValidation = GetTokensByChainIdValidation;

const flts = {
    GetFuseLeveragedTokensByChainIdValidation,
    GetFuseLeveragedTokensByChainId,
    GetFuseLeveragedTokenChartsBySymbol,
    GetFuseLeveragedTokenSwapsBySymbol,
    GetFuseLeveragedTokenBackingsBySymbol,
    GetUserPositionById,
};

export default flts;
