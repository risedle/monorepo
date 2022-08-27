import { BigDecimal } from "@graphprotocol/graph-ts";

// Schema
import { LiquidityPool, LiquidityPoolFee } from "../generated/schema";

export namespace LiquidityPoolFeeType {
    export const FIXED_SWAP_FEE = "FIXED_SWAP_FEE";
    export const TIERED_SWAP_FEE = "TIERED_SWAP_FEE";
    export const DYNAMIC_SWAP_FEE = "DYNAMIC_SWAP_FEE";
    export const FIXED_LP_FEE = "FIXED_LP_FEE";
    export const DYNAMIC_LP_FEE = "DYNAMIC_LP_FEE";
    export const FIXED_PROTOCOL_FEE = "FIXED_PROTOCOL_FEE";
    export const DYNAMIC_PROTOCOL_FEE = "DYNAMIC_PROTOCOL_FEE";
}

function getOrCreateLiquidityPoolFee(
    id: string,
    percentage: BigDecimal,
    type: string,
    pool: LiquidityPool
): LiquidityPoolFee {
    let fee = LiquidityPoolFee.load(id);
    if (fee === null) {
        fee = new LiquidityPoolFee(id);
        fee.percentage = percentage;
        fee.type = type;
        fee.pool = pool.id;
        fee.save();
    }
    return fee;
}

export function getOrCreateLPFee(
    pool: LiquidityPool,
    percentage: BigDecimal,
    type: string
): LiquidityPoolFee {
    let feeId = pool.id.concat("-lp");
    return getOrCreateLiquidityPoolFee(feeId, percentage, type, pool);
}

export function getOrCreateProtocolFee(
    pool: LiquidityPool,
    percentage: BigDecimal,
    type: string
): LiquidityPoolFee {
    let feeId = pool.id.concat("-protocol");
    return getOrCreateLiquidityPoolFee(feeId, percentage, type, pool);
}

export function getOrCreateSwapFee(
    pool: LiquidityPool,
    percentage: BigDecimal,
    type: string
): LiquidityPoolFee {
    let feeId = pool.id.concat("-swap");
    return getOrCreateLiquidityPoolFee(feeId, percentage, type, pool);
}
