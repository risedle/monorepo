import useSWR from "swr";
import { FuseLeverageSwapsHistory } from "@risedle/types";

import { fetcher } from "@/utils/fetcher";
import getBaseConfig from "@/utils/getBaseConfig";

const dummyData = {
    amountInUSD: "0",
    timestamp: "1659328398",
    tokenIn: {
        symbol: "BNBRISE",
    },
    tokenOut: {
        symbol: "BUSD",
    },
    transaction: {
        id: "",
    },
};

const dummySwaps = Array.from(Array(5).keys()).map(() => dummyData);

// Get list of markets using SWR
export function useFuseLeveragedTokenMySwap(
    symbol: string,
    userAddress: string | undefined
) {
    const { chainId } = getBaseConfig();
    const url = userAddress
        ? `https://api.risedle.com/v1/${chainId}/flts/${symbol}/swaps/${userAddress}`
        : null;

    const { data, error } = useSWR<FuseLeverageSwapsHistory, Error>(
        url,
        fetcher
    );

    return {
        data: data,
        isLoaded: data?.user || userAddress === null ? true : false,
        error: error,
    };
}

export default useFuseLeveragedTokenMySwap;
