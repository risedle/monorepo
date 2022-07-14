import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types/chain";
import { GetTokensByChainIdValidation } from "../utils/validationChainId";
import tokensService from "../services/tokens";

/**
 * GetTokensByChainId return list of TokenInfo
 */
async function GetTokensByChainId(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    const tokenInfos = await tokensService.getTokensByChainId(
        req.params.chainId as unknown as ChainId
    );
    return res.json({ tokens: tokenInfos });
}

const tokens = {
    GetTokensByChainIdValidation,
    GetTokensByChainId,
};

export default tokens;
