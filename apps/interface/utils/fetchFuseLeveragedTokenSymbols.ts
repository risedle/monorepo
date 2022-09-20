import { request as grequest, gql } from "graphql-request";

import { getBaseConfig } from "../utils/getBaseConfig";

/**
 * NOTE:
 * We fetch data directly from the graphql endpoint in order to speed up the the
 * query process to pre-render the app on server side.
 *
 * On client side, we will use api.risedle.com.
 */

const queryFuseLeveragedTokenSymbols = gql`
    {
        flts(orderBy: symbol) {
            symbol
        }
    }
`;

export interface FuseLeveragedTokenSymbols {
    flts: Array<{ symbol: string }>;
}

async function fetchFuseLeveragedTokenSymbols(): Promise<FuseLeveragedTokenSymbols> {
    const { graphEndpoint } = getBaseConfig();
    return await grequest(graphEndpoint, queryFuseLeveragedTokenSymbols);
}

export default fetchFuseLeveragedTokenSymbols;
