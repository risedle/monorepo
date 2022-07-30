import useSWR from "swr";
import { FuseLeverageSwapsHistory } from "@risedle/types";

import { fetcher } from "@/utils/fetcher";

// Get list of markets using SWR
export function useFuseLeveragedTokenSwap(
    symbol: string,
    userAddress: string | undefined
) {
    let url = `https://api.risedle.com/v1/${symbol}/swaps/`;

    if (userAddress) {
        url += `${userAddress}/`;
    }
    const { data, error } = useSWR<FuseLeverageSwapsHistory, Error>(
        url,
        fetcher
    );

    return {
        data: data,
        isLoaded: data?.user !== undefined ? true : false,
        error: error,
    };
}

export default useFuseLeveragedTokenSwap;
