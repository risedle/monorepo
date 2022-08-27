import { BigDecimal } from "@graphprotocol/graph-ts";

// Schema
import { LiquidityPool, Token, TokenLiquidityPool } from "../generated/schema";

export function getOrCreateTokenLiquidityPool(
    token: Token,
    pool: LiquidityPool,
    weight: BigDecimal
): TokenLiquidityPool {
    let id = token.id.concat("-").concat(pool.id);
    let tokenPool = TokenLiquidityPool.load(id);
    if (tokenPool === null) {
        tokenPool = new TokenLiquidityPool(id);
        tokenPool.token = token.id;
        tokenPool.pool = pool.id;
        tokenPool.weightPercentage = weight;

        tokenPool.save();
    }
    return tokenPool;
}
