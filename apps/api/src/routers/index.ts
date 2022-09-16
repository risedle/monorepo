import express, { Router } from "express";
import flt from "../controllers/flt";
import ChainIdValidation from "../utils/validationChainId";

const router: Router = express.Router();

router.get(
    "/:chainId/flts",
    ChainIdValidation,
    flt.GetFuseLeveragedTokensByChainId
);

router.get(
    "/:chainId/flts/:symbol",
    ChainIdValidation,
    flt.GetFuseLeveragedTokenBySymbol
);

router.get(
    "/:chainId/flts/:symbol/charts",
    ChainIdValidation,
    flt.GetFuseLeveragedTokenChartsBySymbol
);

router.get(
    "/:chainId/flts/:symbol/swaps",
    ChainIdValidation,
    flt.GetFuseLeveragedTokenSwapsBySymbol
);

router.get(
    "/:chainId/flts/:symbol/backings",
    ChainIdValidation,
    flt.GetFuseLeveragedTokenBackingsBySymbol
);

router.get(
    "/:chainId/positions/:positionId",
    ChainIdValidation,
    flt.GetFuseLeveragedTokenUserPositionById
);

router.get(
    "/:chainId/flts/insight/gains",
    ChainIdValidation,
    flt.GetFuseLeveragedTokensGains
);

export { router };
