import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types";

import service from "../../services/flt";

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
        const swaps = await service.GetFuseLeveragedTokenBackingsBySymbol(
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

export default GetFuseLeveragedTokenBackingsBySymbol;
