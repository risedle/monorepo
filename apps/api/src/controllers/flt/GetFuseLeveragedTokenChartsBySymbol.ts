import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types";

import service from "../../services/flt";

/**
 * GetFuseLeveragedTokenChartsBySymbol return hourly historical price, daily
 * historical volumes and fees of Fuse Leveraged Token up to 28 days
 */
export async function GetFuseLeveragedTokenChartsBySymbol(
    req: Request,
    res: Response
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const charts = await service.GetFuseLeveragedTokenChartsBySymbol(
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

export default GetFuseLeveragedTokenChartsBySymbol;
