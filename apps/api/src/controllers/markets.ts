import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ChainId } from "@risedle/types/chain";
import { GetTokensByChainIdValidation } from "../utils/validationChainId";
import { getMarketsData } from "../services/market";

/**
 * GetTokensByChainId return list of TokenInfo
 */
async function getMarketsByChainId(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {

    const marketData = await getMarketsData(req.params.chainId as unknown as ChainId);
    return res.json(marketData);
  }
  catch (e) {
    return res.status(500).json(e);
  }
}

const markets = {
  GetTokensByChainIdValidation,
  getMarketsByChainId,
};

export default markets;
