import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types";
import services from "../../services/flt/index";

async function GetFuseLeveragedTokensGains(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const gains = await services.GetFuseLeveragedTokensGains(
            req.params.chainId as unknown as ChainId
        );
        return res.status(200).json({ tokens: gains });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

export default GetFuseLeveragedTokensGains;
