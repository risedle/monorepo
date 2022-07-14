import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types/chain";
import { GetTokensByChainIdValidation } from "../utils/validationChainId";
import { getMarketsData } from "../services/market";

/**
 * getMarketsByChainId return list of markets
 */
async function getMarketsByChainId(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    const { status, ...marketData } = await getMarketsData(
        req.params.chainId as unknown as ChainId
    );
    return res.status(status).json(marketData);
}

const markets = {
    GetTokensByChainIdValidation,
    getMarketsByChainId,
};

export default markets;
