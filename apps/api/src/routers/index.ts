import express from "express";
import fltsController from "../controllers/flts";
import flt from "../controllers/flt";

const router = express.Router();

router.get(
    "/:chainId/flts",
    // TODO(pyk): refactor this
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    flt.GetFuseLeveragedTokensByChainId
);

router.get(
    "/:chainId/flts/:symbol",
    // TODO(pyk): refactor this
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    flt.GetFuseLeveragedTokenBySymbol
);

// TODO(pyk): refactor this
router.get(
    "/:chainId/flts/:symbol/charts",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenChartsBySymbol
);

router.get(
    "/:chainId/flts/:symbol/swaps",
    // TODO(pyk): refactor this
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    flt.GetFuseLeveragedTokenSwapsBySymbol
);

// TODO(pyk): refactor this
router.get(
    "/:chainId/flts/:symbol/backings",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokenBackingsBySymbol
);

router.get(
    "/:chainId/positions/:positionId",
    // TODO(pyk): refactor this
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    flt.GetFuseLeveragedTokenUserPositionById
);

router.get(
    "/:chainId/flts/insight/gains",
    fltsController.GetFuseLeveragedTokensByChainIdValidation,
    fltsController.GetFuseLeveragedTokensGains
);

export { router };
