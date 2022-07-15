import express from "express";
import quotesController from "../controllers/quotes";
import tokensController from "../controllers/tokens";
import fltsController from "../controllers/flts";

const router = express.Router();

router.get("/quotes", quotesController.GetQuotes);

router.get(
    "/:chainId/tokens",
    tokensController.GetTokensByChainIdValidation,
    tokensController.GetTokensByChainId
);

router.get(
    "/:chainId/flts",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokensByChainId
);

router.get(
    "/:chainId/flts/:symbol",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenBySymbol
);

router.get(
    "/:chainId/flts/:symbol/prices",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenPricesBySymbol
);

export { router };
