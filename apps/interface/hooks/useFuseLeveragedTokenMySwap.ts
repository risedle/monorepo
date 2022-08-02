import useSWR from "swr";
import { FuseLeverageSwapsHistory } from "@risedle/types";

import { fetcher } from "@/utils/fetcher";

// Get list of markets using SWR
export function useFuseLeveragedTokenMySwap(
    symbol: string,
    userAddress: string | undefined
) {
    const url = userAddress
        ? `https://api.risedle.com/v1/${chaindId}/flts/${symbol}/swaps/${userAddress}`
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
