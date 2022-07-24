import { request as grequest, gql } from "graphql-request";
import { ChainId, FuseLeveragedTokenUserPosition } from "@risedle/types";

import { getGraphEndpointByChainId } from "./index";

const queryUserPositionById = gql`
    query getUserOpenPosition($id: ID!) {
        position: openPosition(id: $id) {
            flt {
                price: fltHourData(
                    first: 1
                    orderBy: periodStartUnix
                    orderDirection: desc
                ) {
                    timestamp: periodStartUnix
                    close
                }
            }
            amount
            amountUSD
        }
    }
`;

/**
 * Get user position by id
 */
export async function GetFuseLeveragedTokenUserPositionById(
    chainId: ChainId,
    positionId: string
): Promise<FuseLeveragedTokenUserPosition | undefined> {
    // Get data from the graph
    const endpoint = getGraphEndpointByChainId(chainId);
    const filter = positionId.toLowerCase();
    const data = await grequest(endpoint, queryUserPositionById, {
        id: filter,
    });
    if (data.position == null) return undefined;
    const balance = parseFloat(data.position.amount);
    const price = parseFloat(data.position.flt.price[0].close);
    const usd = balance * price;
    const principal = parseFloat(data.position.amountUSD);
    const pnlUSD = usd - principal;
    const pnlPercent = (pnlUSD / principal) * 100;
    return { balance, usd, pnlUSD, pnlPercent };
}

export default GetFuseLeveragedTokenUserPositionById;
