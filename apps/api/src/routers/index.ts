import express from "express";
import quotesController from "../controllers/quotes";
import tokensController from "../controllers/tokens";
import marketsController from '../controllers/markets';
const router = express.Router();

router.get("/quotes", quotesController.GetQuotes);

router.get(
    "/:chainId/tokens",
    tokensController.GetTokensByChainIdValidation,
    tokensController.GetTokensByChainId
);

router.get(
    "/:chainId/markets",
    marketsController.GetTokensByChainIdValidation,
    marketsController.getMarketsByChainId
)

export { router };
