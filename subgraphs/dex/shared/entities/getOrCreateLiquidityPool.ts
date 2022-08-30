import { Address } from "@graphprotocol/graph-ts";

// Schema
import { LiquidityPool, Protocol } from "../../generated/schema";

// Shared
import { ZERO_BD, ZERO_BI } from "../libs/math";

export function getOrCreateLiquidityPool(
    poolAddress: Address,
    protocol: Protocol
): LiquidityPool {
    let pool = LiquidityPool.load(poolAddress.toHexString());
    if (pool === null) {
        pool = new LiquidityPool(poolAddress.toHexString());
        pool.name = "";
        pool.slug = "";
        pool.createdAtTimestamp = ZERO_BI;
        pool.createdAtBlockNumber = ZERO_BI;
        pool.tokenCount = 0;
        pool.protocol = protocol.id;

        pool.save();
    }
    return pool;
}
