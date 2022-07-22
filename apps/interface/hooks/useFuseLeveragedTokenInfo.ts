import useSWR from "swr";
import { FuseLeveragedTokenInfo } from "@risedle/types";

import { getBaseConfig } from "../utils/getBaseConfig";
import { fetcher } from "../utils/fetcher";

// Get list of markets using SWR
export function useFuseLeveragedTokenInfo(symbol: string) {
    const { chainId } = getBaseConfig();
    const url = `https://api.risedle.com/v1/${chainId}/flts/${symbol}`;
    const { data, error } = useSWR<FuseLeveragedTokenInfo, Error>(
        url,
        fetcher
    );

    return {
        data: data,
        isLoaded: data ? true : false,
        error: error,
    };
}
