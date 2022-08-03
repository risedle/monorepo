import { request as grequest, gql } from "graphql-request";
import { ChainId, FuseLeveragedTokenSwaps } from "@risedle/types";

import { getGraphEndpointByChainId } from "./index";

const queryFuseLeveragedTokenSwapsBySymbol = gql`
    query getFuseLeveragedTokenSwaps($symbol: String, $user: String) {
        flts: flts(where: { symbol: $symbol }) {
            swaps(first: 100, orderBy: timestamp, orderDirection: desc) {
                ...swapInfo
            }
        }
        user: flts(where: { symbol: $symbol }) {
            swaps(
                first: 100
                orderBy: timestamp
                orderDirection: desc
                where: { user: $user }
            ) {
                ...swapInfo
            }
        }
    }

    fragment swapInfo on Swap {
        timestamp
        transaction {
            id
        }
        amountIn
        amountInUSD
        amountOut
        amountOutUSD
        user {
            id
        }
        tokenIn {
            name
            symbol
        }
        tokenOut {
            name
            symbol
        }
    }
`;

/**
 * Get Fuse Leveraged Token swaps activity
 */
export async function GetFuseLeveragedTokenSwapsBySymbol(
    chainId: ChainId,
    fltSymbol: string,
    userAddress: string | undefined
): Promise<FuseLeveragedTokenSwaps | undefined> {
    // Get data from the graph
    const endpoint = getGraphEndpointByChainId(chainId);
    const data = await grequest(
        endpoint,
        queryFuseLeveragedTokenSwapsBySymbol,
        {
            symbol: fltSymbol.toUpperCase(),
            user: userAddress?.toLowerCase(),
        }
    );
    if (data.flts.length == 0) return undefined;
    const flt = data.flts[0].swaps.map((swap: any) => {
        return {
            timestamp: parseInt(swap.timestamp),
            hash: swap.transaction.id,
            user: swap.user.id,
            tokenIn: swap.tokenIn,
            amountIn: parseFloat(swap.amountIn),
            amountInUSD: parseFloat(swap.amountInUSD),
            tokenOut: swap.tokenOut,
            amountOut: parseFloat(swap.amountOut),
            amountOutUSD: parseFloat(swap.amountOutUSD),
        };
    });
    const user = data.user[0].swaps.map((swap: any) => {
        return {
            timestamp: parseInt(swap.timestamp),
            hash: swap.transaction.id,
            user: swap.user.id,
            tokenIn: swap.tokenIn,
            amountIn: parseFloat(swap.amountIn),
            amountInUSD: parseFloat(swap.amountInUSD),
            tokenOut: swap.tokenOut,
            amountOut: parseFloat(swap.amountOut),
            amountOutUSD: parseFloat(swap.amountOutUSD),
        };
    });
    return { flt, user };
}

export default GetFuseLeveragedTokenSwapsBySymbol;
