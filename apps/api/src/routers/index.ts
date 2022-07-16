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

export { router };
