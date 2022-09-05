import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types";

import service from "../../services/flt";

/**
 * GetFuseLeveragedTokensByChainId return list of Fuse Leveraged Tokens
 */
async function GetFuseLeveragedTokensByChainId(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const flts = await service.GetFuseLeveragedTokensByChainId(
            req.params.chainId as unknown as ChainId
        );
        return res.status(200).json(flts);
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

export default GetFuseLeveragedTokensByChainId;
