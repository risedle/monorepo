import { request as grequest, gql } from "graphql-request";

import { getBaseConfig } from "../utils/getBaseConfig";
import { FuseLeveragedToken } from "./types";

/**
 * NOTE:
 * We fetch data directly from the graphql endpoint in order to speed up the the
 * query process to pre-render the app on server side.
 *
 * On client side, we will use api.risedle.com.
 */

const queryFuseLeveragedTokenBySymbol = gql`
    query getFuseLeveagedTokenBySymbol($symbol: String) {
        flts(orderBy: symbol, where: { symbol: $symbol }) {
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

interface FuseLeveragedTokenBySymbolResponse {
    flts: Array<FuseLeveragedToken>;
}

export async function fetchFuseLeveragedTokenBySymbol(
    symbol: string
): Promise<FuseLeveragedTokenBySymbolResponse> {
    const { graphEndpoint } = getBaseConfig();
    const filter = symbol.toUpperCase();
    return await grequest(graphEndpoint, queryFuseLeveragedTokenBySymbol, {
        symbol: filter,
    });
}
