import express from "express";
import quotes from "../controllers/quotes";
import tokens from "../controllers/tokens";

const router = express.Router();

router.get("/quotes", quotes.GetQuotes);

router.get(
    "/:chainId/tokens",
    tokens.GetTokensByChainIdValidation,
    tokens.GetTokensByChainId
);

export { router };
