import { request as grequest, gql } from "graphql-request";
import { ChainId } from "@risedle/types";

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
            collateral {
                name
                symbol
            }
            debt {
                name
                symbol
            }
        }
    }
`;

interface FuseLeveragedTokenBackingInfo {
    name: string;
    symbol: string;
    amount: number;
}

interface FuseLeveragedTokenInfo {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    priceUSD: number;
    dailyPriceChangeUSD: number;
    dailyPriceChangePercentage: number;
    totalVolumeUSD: number;
    dailyVolumeChangeUSD: number;
    dailyVolumeChangePercentage: number;
    marketcapUSD: number;
    collateral: FuseLeveragedTokenBackingInfo;
    debt: FuseLeveragedTokenBackingInfo;
    totalCollateral: number;
    totalDebt: number;
}

// prettier-ignore
const BSC_GRAPH = "https://api.thegraph.com/subgraphs/name/risedle/risedle-flt-bsc";

/**
 * Given Chain ID, return The Graph endpoint
 */
export function getGraphEndpointByChainId(
    chainId: ChainId
): string | undefined {
    switch (chainId) {
        case ChainId.BSC:
            return BSC_GRAPH;
        default:
            return undefined;
    }
}

/**
 * Get Fuse Leveraged Token Info by Chain Id
 */
export async function getFuseLeveragedTokensByChainId(
    chainId: ChainId
): Promise<Array<FuseLeveragedTokenInfo>> {
    // Return empty array if no endpoint for given chain
    const endpoint = getGraphEndpointByChainId(chainId);
    if (!endpoint) return [];

    // Get data from the graph
    const data = await grequest(endpoint, queryFuseLeveragedTokens);
    const tokens = [];
    for (const flt of data.flts) {
        // Price and volume daily change
        const currentPrice = parseFloat(flt.dailyData[0].close);
        const prevPrice = parseFloat(flt.dailyData[1].open);
        const currentVol = parseFloat(flt.dailyData[0].tradeVolumeUSD);
        const prevVol = parseFloat(flt.dailyData[1].tradeVolumeUSD);
        const totalSupply = parseFloat(flt.dailyData[0].totalSupply);
        const totalCollateral = parseFloat(flt.dailyData[0].totalCollateral);
        const totalDebt = parseFloat(flt.dailyData[0].totalDebt);
        const collateralPerShare = parseFloat(
            flt.dailyData[0].collateralPerShare
        );
        const debtPerShare = parseFloat(flt.dailyData[0].debtPerShare);

        const priceChangeUSD = currentPrice - prevPrice;
        let priceChangePercentage;
        if (prevPrice == 0) {
            priceChangePercentage = 0;
        } else {
            priceChangePercentage = (priceChangeUSD / prevPrice) * 100;
        }
        const volChangeUSD = currentVol - prevVol;
        let volChangePercentage;
        if (prevVol == 0) {
            volChangePercentage = 0;
        } else {
            volChangePercentage = (volChangeUSD / prevVol) * 100;
        }
        const marketcapUSD = totalSupply * currentPrice;

        tokens.push({
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
            collateral: {
                name: flt.collateral.name,
                symbol: flt.collateral.symbol,
                amount: collateralPerShare,
            },
            debt: {
                name: flt.debt.name,
                symbol: flt.debt.symbol,
                amount: debtPerShare,
            },
            totalCollateral: totalCollateral,
            totalDebt: totalDebt,
        });
    }

    return tokens;
}

const flts = {
    getFuseLeveragedTokensByChainId,
};

export default flts;
