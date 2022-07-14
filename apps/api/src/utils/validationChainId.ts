import { isChainIdSupported } from "@risedle/chains";
import { param } from "express-validator";

/**
 * List of validations for get tokens and markets by chainId operation
 */

const GetTokensByChainIdValidation = [
    param("chainId")
        .exists({ checkFalsy: true })
        .toInt()
        .custom((chainId) => isChainIdSupported(chainId))
        .withMessage("chainId not supported"),
];

export { GetTokensByChainIdValidation };
