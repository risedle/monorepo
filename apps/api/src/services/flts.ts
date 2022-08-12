import { request as grequest, gql } from "graphql-request";
import { ChainId, FuseLeveragedTokenInfo } from "@risedle/types";

const queryFuseLeveragedTokenChartsBySymbol = gql`
    query getFuseLeveagedTokenCharts($symbol: String) {
        flts(where: { symbol: $symbol }) {
            prices: fltHourData(
                first: 672
                orderBy: periodStartUnix
                orderDirection: desc
            ) {
                timestamp: periodStartUnix
                open
                high
                low
                close
            }
            volumes: fltDayData(
                first: 28
                orderBy: periodStartUnix
                orderDirection: desc
            ) {
                timestamp: periodStartUnix
                usd: tradeVolumeUSD
            }
            fees: fltDayData(
                first: 28
                orderBy: periodStartUnix
                orderDirection: desc
            ) {
                timestamp: periodStartUnix
                usd: tradeFeeUSD
            }
        }
    }
`;

const queryFuseLeveragedTokenBackingsBySymbol = gql`
    query getFuseLeveagedTokenBackings($symbol: String) {
        flts(where: { symbol: $symbol }) {
            backings: fltDayData(
                first: 28
                orderBy: periodStartUnix
                orderDirection: desc
            ) {
                timestamp: periodStartUnix
                collateralPerShare
                debtPerShare
                valueUSD: priceUSD
            }
        }
    }
`;

// prettier-ignore
const BSC_GRAPH = "https://api.thegraph.com/subgraphs/name/risedle/risedle-flt-bsc";

/**
 * Given Chain ID, return The Graph endpoint
 */
export function getGraphEndpointByChainId(chainId: ChainId): string {
    switch (chainId) {
        case ChainId.BSC:
            return BSC_GRAPH;
        default:
            throw "Endpoint not defined for chainId " + chainId;
    }
}

interface FuseLeveragedTokenPrice {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface FuseLeveragedTokenVolume {
    timestamp: number;
    usd: number;
}

interface FuseLeveragedTokenFee {
    timestamp: number;
    usd: number;
}

interface FuseLeveragedTokenChart {
    prices: Array<FuseLeveragedTokenPrice>;
    volumes: Array<FuseLeveragedTokenVolume>;
    fees: Array<FuseLeveragedTokenFee>;
}

interface FuseLeveragedTokenSwap {
    hash: string;
    user: string;
    timestamp: number;
    tokenIn: {
        name: string;
        symbol: string;
    };
    amountIn: number;
    amountInUSD: number;
    tokenOut: {
        name: string;
        symbol: string;
    };
    amountOut: number;
    amountOutUSD: number;
}

interface FuseLeveragedTokenSwaps {
    flt: Array<FuseLeveragedTokenSwap>;
    user: Array<FuseLeveragedTokenSwap>;
}

interface FuseLeveragedTokenBacking {
    timestamp: number;
    collateralPerShare: number;
    debtPerShare: number;
    valueUSD: number;
}

interface FuseLeveragedTokenBackings {
    backings: Array<FuseLeveragedTokenBacking>;
}

/**
 * Get Fuse Leveraged Token historical prices, volumes and fees by symbol
 */
export async function getFuseLeveragedTokenChartsBySymbol(
    chainId: ChainId,
    fltSymbol: string
): Promise<FuseLeveragedTokenChart | undefined> {
    // Get data from the graph
    const endpoint = getGraphEndpointByChainId(chainId);
    const filter = fltSymbol.toUpperCase();
    const data = await grequest(
        endpoint,
        queryFuseLeveragedTokenChartsBySymbol,
        {
            symbol: filter,
        }
    );
    if (data.flts.length == 0) return undefined;
    const prices = data.flts[0].prices.map((price: any) => {
        return {
            timestamp: price.timestamp,
            open: parseFloat(price.open),
            high: parseFloat(price.high),
            low: parseFloat(price.low),
            close: parseFloat(price.close),
        };
    });
    const volumes = data.flts[0].volumes.map((volume: any) => {
        return {
            timestamp: volume.timestamp,
            usd: parseFloat(volume.usd),
        };
    });
    const fees = data.flts[0].fees.map((fee: any) => {
        return {
            timestamp: fee.timestamp,
            usd: parseFloat(fee.usd),
        };
    });
    return { prices, volumes, fees };
}

/**
 * Get Fuse Leveraged Token historical backings
 */
export async function getFuseLeveragedTokenBackingsBySymbol(
    chainId: ChainId,
    fltSymbol: string
): Promise<FuseLeveragedTokenBackings | undefined> {
    // Get data from the graph
    const endpoint = getGraphEndpointByChainId(chainId);
    const filter = fltSymbol.toUpperCase();
    const data = await grequest(
        endpoint,
        queryFuseLeveragedTokenBackingsBySymbol,
        {
            symbol: filter,
        }
    );
    if (data.flts.length == 0) return undefined;
    const backings = data.flts[0].backings.map((backing: any) => {
        return {
            timestamp: backing.timestamp,
            collateralPerShare: parseFloat(backing.collateralPerShare),
            debtPerShare: parseFloat(backing.debtPerShare),
            valueUSD: parseFloat(backing.valueUSD),
        };
    });
    return { backings };
}

const flts = {
    getFuseLeveragedTokenChartsBySymbol,
    getFuseLeveragedTokenBackingsBySymbol,
};

export default flts;
