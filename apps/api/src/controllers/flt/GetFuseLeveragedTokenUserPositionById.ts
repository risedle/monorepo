import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types";

import service from "../../services/flt";

/**
 * GetFuseLeveragedTokenUserPositionById return user position
 */
async function GetFuseLeveragedTokenUserPositionById(
    req: Request,
    res: Response
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const position = await service.GetFuseLeveragedTokenUserPositionById(
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

export default GetFuseLeveragedTokenUserPositionById;
