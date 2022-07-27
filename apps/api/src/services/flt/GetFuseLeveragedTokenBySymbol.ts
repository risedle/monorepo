import { request as grequest, gql } from "graphql-request";
import { ChainId, FuseLeveragedTokenInfo } from "@risedle/types";

import { getGraphEndpointByChainId } from "./index";

const queryFuseLeveragedTokenBySymbol = gql`
    query getFuseLeveragedToken($symbol: String) {
        flts(orderBy: symbol, where: { symbol: $symbol }) {
            name
            symbol
            decimals
            address: id
            maxSupply
            currentData: fltHourData(
                first: 1
                orderBy: periodStartUnix
                orderDirection: desc
            ) {
                timestamp: periodStartUnix
                price: close
                tradeVolumeUSD
                totalSupply
                totalCollateral
                totalDebt
                collateralPerShare
                debtPerShare
            }
            previousData: fltHourData(
                first: 1
                skip: 24
                orderBy: periodStartUnix
                orderDirection: desc
            ) {
                timestamp: periodStartUnix
                price: close
                tradeVolumeUSD
                collateralPerShare
                debtPerShare
            }
            totalVolumeUSD
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

/**
 * Get Fuse Leveraged Token Info by Symbol
 */
export async function GetFuseLeveragedTokenBySymbol(
    chainId: ChainId,
    symbol: string
): Promise<FuseLeveragedTokenInfo | undefined> {
    // Get data from the graph
    const endpoint = getGraphEndpointByChainId(chainId);
    const data = await grequest(endpoint, queryFuseLeveragedTokenBySymbol, {
        symbol: symbol.toUpperCase(),
    });

    // If no found then symbol may invalid; return undefined
    if (data.flts.length == 0) return undefined;

    // Parse data from GraphQL
    const flt = data.flts[0];
    const name = flt.name;
    const decimals = parseInt(flt.decimals);
    symbol = flt.symbol;
    const address = flt.address;

    const priceUSD = parseFloat(flt.currentData[0].price);
    const prevPriceUSD = parseFloat(flt.previousData[0].price);
    const dailyPriceChangeUSD = priceUSD - prevPriceUSD;
    const dailyPriceChangePercentage =
        (dailyPriceChangeUSD / prevPriceUSD) * 100;

    const totalVolumeUSD = parseFloat(flt.totalVolumeUSD);
    const currentVolumeUSD = parseFloat(flt.currentData[0].tradeVolumeUSD);
    const prevVolumeUSD = parseFloat(flt.previousData[0].tradeVolumeUSD);
    const dailyVolumeChangeUSD = currentVolumeUSD - prevVolumeUSD;
    const dailyVolumeChangePercentage =
        (dailyVolumeChangeUSD / prevVolumeUSD) * 100 || 0;

    const totalSupply = parseFloat(flt.currentData[0].totalSupply);
    const maxSupply = parseFloat(flt.maxSupply);
    const marketcapUSD = totalSupply * priceUSD;
    const maxMarketcapUSD = maxSupply * priceUSD;

    const totalCollateral = parseFloat(flt.currentData[0].totalCollateral);
    const totalDebt = parseFloat(flt.currentData[0].totalDebt);

    const collateralPerShare = parseFloat(
        flt.currentData[0].collateralPerShare
    );
    const prevCollateralPerShare = parseFloat(
        flt.previousData[0].collateralPerShare
    );
    const collateralChange = collateralPerShare - prevCollateralPerShare;
    const collateralChangePercent =
        (collateralChange / prevCollateralPerShare) * 100 || 0;

    const debtPerShare = parseFloat(flt.currentData[0].debtPerShare);
    const prevDebtPerShare = parseFloat(flt.previousData[0].debtPerShare);
    const debtChange = debtPerShare - prevDebtPerShare;
    const debtChangePercent = (debtChange / prevDebtPerShare) * 100 || 0;

    const collateral = {
        name: flt.collateral.name,
        symbol: flt.collateral.symbol,
        decimals: parseInt(flt.collateral.decimals),
        amount: collateralPerShare,
        change: collateralChange,
        changePercent: collateralChangePercent,
    };

    const debt = {
        name: flt.debt.name,
        symbol: flt.debt.symbol,
        decimals: parseInt(flt.debt.decimals),
        amount: debtPerShare,
        change: debtChange,
        changePercent: debtChangePercent,
    };

    return {
        name,
        symbol,
        decimals,
        address,
        priceUSD,
        dailyPriceChangeUSD,
        dailyPriceChangePercentage,
        totalVolumeUSD,
        dailyVolumeChangeUSD,
        dailyVolumeChangePercentage,
        marketcapUSD,
        maxMarketcapUSD,
        totalCollateral,
        totalDebt,
        collateral,
        debt,
    };
}

export default GetFuseLeveragedTokenBySymbol;
