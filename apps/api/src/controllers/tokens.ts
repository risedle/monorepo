import { Request, Response } from "express";
import { param, validationResult } from "express-validator";
import { ChainId } from "@risedle/types/chain";
import { isChainIdSupported } from "@risedle/chains";
import tokensService from "../services/tokens";

/**
 * List of validations for get tokens by chainId operation
 */
const GetTokensByChainIdValidation = [
    param("chainId")
        .exists({ checkFalsy: true })
        .toInt()
        .custom((chainId) => isChainIdSupported(chainId))
        .withMessage("chainId not supported"),
];

/**
 * GetTokensByChainId return list of TokenInfo
 */
async function GetTokensByChainId(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    // const chainId: ChainId = ChainId[req.params.chainId as unknown as string];
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
