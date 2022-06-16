import { Request, Response } from "express";
import { query } from "express-validator/check";
import { ethers, BigNumber } from "ethers";

/**
 * GetQuotes request query params validation
 */
const GetQuotesValidation = [
    query("chainId")
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Invalid chainId")
        .custom((value) => value in Chain)
        .withMessages("chainId not supported"),
    query("tokenIn")
        .exists({ checkFalsy: true })
        .withMessage("Invalid tokenIn")
        .isEthereumAddress()
        .trim()
        .withMessages("Invalid tokenIn address")
        .customSanitizer((value) => ethers.utils.getAddress(value))
        .custom((value) => value in getTokens(req.query.chainId))
        .withMessage("tokenIn not supported in chainId"),
    query("tokenOut")
        .exists({ checkFalsy: true })
        .withMessage("Invalid tokenOut")
        .isEthereumAddress()
        .trim()
        .withMessages("Invalid tokenIn address")
        .customSanitizer((value) => ethers.utils.getAddress(value))
        .custom((value) => value in getTokens(req.query.chainId))
        .withMessage("tokenIn not supported in chainId"),
    query("amountIn")
        .exists({ checkFalsy: true })
        .withMessage("Invalid amountIn")
        .customSanitizer((value) => BigNumber.from(value))
        .withMessage("amountIn is not BigNumberish"),
];

/**
 * GetQuotes return the best quotes for exchanging tokenIn for tokenOut
 */
async function GetQuotes(req: Request, res: Response) {
    // TODO(pyk): Perform data validation and sanitization here
    return res.send({ message: "OK" });
}

const quotes = {
    GetQuotes,
};

export default quotes;
