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
        return res.status(200).json({ tokens: flts });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

/**
 * GetFuseLeveragedTokenBySymbol return Fuse Leveraged Token
 */
async function GetFuseLeveragedTokenBySymbol(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const flt = await fltsService.getFuseLeveragedTokenBySymbol(
            req.params.chainId as unknown as ChainId,
            req.params.symbol
        );
        if (flt == undefined) {
            return res.status(404).json({
                errors: [
                    {
                        location: "params",
                        msg: "symbol not found",
                        param: "symbol",
                        value: "hohoho",
                    },
                ],
            });
        }
        return res.status(200).json(flt);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

const GetFuseLeveragedTokensByChainIdValidation = GetTokensByChainIdValidation;

const flts = {
    GetFuseLeveragedTokensByChainIdValidation,
    GetFuseLeveragedTokensByChainId,
    GetFuseLeveragedTokenBySymbol,
};

export default flts;
