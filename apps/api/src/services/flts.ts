import { request as grequest, gql } from "graphql-request";
import { ChainId, FuseLeveragedTokenInfo } from "@risedle/types";

const queryFuseLeveragedTokens = gql`
    {
        flts: flts(orderBy: symbol) {
            name
            symbol
            decimals
            address: id
            dailyData: fltDayData(
                orderBy: periodStartUnix
                orderDirection: desc
                first: 2
            ) {
                open
                close
                tradeVolumeUSD
                totalSupply
                collateralPerShare
                debtPerShare
                totalCollateral
                totalDebt
            }
            totalVolumeUSD
            maxSupply
            collateral {
                name
                symbol
                decimals
            }
            debt {
                name
                symbol
                decimals
            }
        }
    }
`;

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

function getFuseLeveragedTokenInfo(flt: any): FuseLeveragedTokenInfo {
    // Price and volume daily change
    const currentPrice = parseFloat(flt.dailyData[0].close);
    const prevPrice = parseFloat(flt.dailyData[1].open);
    const currentVol = parseFloat(flt.dailyData[0].tradeVolumeUSD);
    const prevVol = parseFloat(flt.dailyData[1].tradeVolumeUSD);
    const totalSupply = parseFloat(flt.dailyData[0].totalSupply);
    const maxSupply = parseFloat(flt.maxSupply);
    const totalCollateral = parseFloat(flt.dailyData[0].totalCollateral);
    const totalDebt = parseFloat(flt.dailyData[0].totalDebt);
    const collateralPerShare = parseFloat(flt.dailyData[0].collateralPerShare);
    const debtPerShare = parseFloat(flt.dailyData[0].debtPerShare);

    const priceChangeUSD = currentPrice - prevPrice;
    const priceChangePercentage = (priceChangeUSD / prevPrice) * 100 || 0;
    const volChangeUSD = currentVol - prevVol;
    const volChangePercentage = (volChangeUSD / prevVol) * 100 || 0;
    const marketcapUSD = totalSupply * currentPrice;
    const maxMarketcapUSD = maxSupply * currentPrice;

    return {
        name: flt.name,
        symbol: flt.symbol,
        decimals: parseInt(flt.decimals),
        address: flt.address,
        priceUSD: currentPrice,
        dailyPriceChangeUSD: priceChangeUSD,
        dailyPriceChangePercentage: priceChangePercentage,
        totalVolumeUSD: parseFloat(flt.totalVolumeUSD),
        dailyVolumeChangeUSD: volChangeUSD,
        dailyVolumeChangePercentage: volChangePercentage,
        marketcapUSD: marketcapUSD,
        maxMarketcapUSD,
        collateral: {
            name: flt.collateral.name,
            symbol: flt.collateral.symbol,
            amount: collateralPerShare,
            decimals: parseInt(flt.collateral.decimals),
            // TODO(pyk): update this
            change: 0,
            changePercent: 0,
        },
        debt: {
            name: flt.debt.name,
            symbol: flt.debt.symbol,
            amount: debtPerShare,
            decimals: parseInt(flt.debt.decimals),
            // TODO(pyk): update this
            change: 0,
            changePercent: 0,
        },
        totalCollateral: totalCollateral,
        totalDebt: totalDebt,
    };
}

interface FuseLeveragedTokenInfos {
    tokens: Array<FuseLeveragedTokenInfo>;
}

/**
 * Get Fuse Leveraged Token Info by Chain Id
 */
export async function getFuseLeveragedTokensByChainId(
    chainId: ChainId
): Promise<FuseLeveragedTokenInfos> {
    // Get data from the graph
    const endpoint = getGraphEndpointByChainId(chainId);
    const data = await grequest(endpoint, queryFuseLeveragedTokens);
    const tokens = [];
    for (const flt of data.flts) {
        tokens.push(getFuseLeveragedTokenInfo(flt));
    }
    return { tokens };
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
    getFuseLeveragedTokensByChainId,
    getFuseLeveragedTokenChartsBySymbol,
    getFuseLeveragedTokenBackingsBySymbol,
};

export default flts;
