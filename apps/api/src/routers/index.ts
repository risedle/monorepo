import express from "express";
import fltsController from "../controllers/flts";

const router = express.Router();

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
    "/:chainId/flts/:symbol/charts",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenChartsBySymbol
);

router.get(
    "/:chainId/flts/:symbol/swaps",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenSwapsBySymbol
);

router.get(
    "/:chainId/flts/:symbol/backings",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenBackingsBySymbol
);

router.get(
    "/:chainId/positions/:positionId",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetUserPositionById
);

export { router };
