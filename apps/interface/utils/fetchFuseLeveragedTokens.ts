import { request as grequest, gql } from "graphql-request";

import { getBaseConfig } from "./getBaseConfig";
import { FuseLeveragedTokens } from "./types";

/**
 * NOTE:
 * We fetch data directly from the graphql endpoint in order to speed up the the
 * query process to pre-render the app on server side.
 *
 * On client side, we will use api.risedle.com.
 */

const queryFuseLeveragedTokens = gql`
    {
        tokens: flts(orderBy: symbol) {
            name
            symbol
            decimals
            address: id
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

export const fetchFuseLeveragedTokens =
    async (): Promise<FuseLeveragedTokens> => {
        const { graphEndpoint } = getBaseConfig();
        return await grequest(graphEndpoint, queryFuseLeveragedTokens);
    };
