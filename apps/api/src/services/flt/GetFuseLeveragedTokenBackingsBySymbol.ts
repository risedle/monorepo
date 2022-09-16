import { request as grequest, gql } from "graphql-request";
import { ChainId } from "@risedle/types";

import { getGraphEndpointByChainId } from "./index";

interface FuseLeveragedTokenBacking {
    timestamp: number;
    collateralPerShare: number;
    debtPerShare: number;
    valueUSD: number;
}

interface FuseLeveragedTokenBackings {
    backings: Array<FuseLeveragedTokenBacking>;
}

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

/**
 * Get Fuse Leveraged Token historical backings
 */
export async function GetFuseLeveragedTokenBackingsBySymbol(
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
    const backings = data.flts[0].backings.map(
        (backing: {
            timestamp: number;
            collateralPerShare: string;
            debtPerShare: string;
            valueUSD: string;
        }) => {
            return {
                timestamp: backing.timestamp,
                collateralPerShare: parseFloat(backing.collateralPerShare),
                debtPerShare: parseFloat(backing.debtPerShare),
                valueUSD: parseFloat(backing.valueUSD),
            };
        }
    );
    return { backings };
}

export default GetFuseLeveragedTokenBackingsBySymbol;
