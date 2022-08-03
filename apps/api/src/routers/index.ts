import express from "express";
import fltsController from "../controllers/flts";
import flt from "../controllers/flt";

const router = express.Router();

router.get(
    "/:chainId/flts",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokensByChainId
);

router.get(
    "/:chainId/flts/:symbol",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    flt.GetFuseLeveragedTokenBySymbol
);

router.get(
    "/:chainId/flts/:symbol/charts",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenChartsBySymbol
);

router.get(
    "/:chainId/flts/:symbol/swaps",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    flt.GetFuseLeveragedTokenSwapsBySymbol
);

router.get(
    "/:chainId/flts/:symbol/backings",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenBackingsBySymbol
);

router.get(
    "/:chainId/positions/:positionId",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    flt.GetFuseLeveragedTokenUserPositionById
);

export { router };
