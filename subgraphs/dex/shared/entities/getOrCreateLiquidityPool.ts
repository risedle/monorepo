import { Address } from "@graphprotocol/graph-ts";

// Schema
import { LiquidityPool, Protocol } from "../../generated/schema";

// Shared
import { ZERO_BD, ZERO_BI } from "../libs/math";

export function getOrCreateLiquidityPool(
    poolAddress: Address,
    name: string,
    slug: string,
    protocol: Protocol
): LiquidityPool {
    let pool = LiquidityPool.load(poolAddress.toHexString());
    if (pool === null) {
        pool = new LiquidityPool(poolAddress.toHexString());
        pool.name = name;
        pool.slug = slug;
        pool.createdAtTimestamp = ZERO_BI;
        pool.createdAtBlockNumber = ZERO_BI;
        pool.totalValueLockedUSD = ZERO_BD;
        pool.cumulativeVolumeUSD = ZERO_BD;
        pool.cumulativeLPRevenueUSD = ZERO_BD;
        pool.cumulativeProtocolRevenueUSD = ZERO_BD;
        pool.cumulativeTotalRevenueUSD = ZERO_BD;
        pool.cumulativeUniqueUsers = 0;
        pool.tokenCount = 0;
        pool.protocol = protocol.id;

        pool.save();
    }
    return pool;
}
