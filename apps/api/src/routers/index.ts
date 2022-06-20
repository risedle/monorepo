import express from "express";
import quotesController from "../controllers/quotes";
import tokensController from "../controllers/tokens";

const router = express.Router();

router.get("/quotes", quotesController.GetQuotes);

router.get(
    "/:chainId/tokens",
    tokensController.GetTokensByChainIdValidation,
    tokensController.GetTokensByChainId
);

export { router };
