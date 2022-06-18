import { Request, Response } from "express";

import { param, validationResult } from "express-validator";

// TODO(pyk): refactor this if this used by other controllers

enum ChainId {
    BSC = 56,
}

const SupportedChains = [
    {
        name: "Binance Smart Chain",
        symbol: "BSC",
        currency: "BNB",
        id: ChainId.BSC,
    },
];

const supportedChainIds = SupportedChains.map((v) => v.id);

/**
 * List of validations for get tokens by chainId operation
 */
const GetTokensByChainIdValidation = [
    param("chainId")
        .exists({ checkFalsy: true })
        .toInt()
        .custom((value) => value in supportedChainIds)
        .withMessage("chainId not supported"),
];

/**
 * GetTokensByChainId return list of token and their basic information such as
 * daily price change percentage.
 */
async function GetTokensByChainId(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    return res.send({ message: "OK" });
}

const tokens = {
    GetTokensByChainIdValidation,
    GetTokensByChainId,
};

export default tokens;
