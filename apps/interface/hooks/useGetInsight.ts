import useSWR from "swr";
import { FuseLeveragedTokenInsight } from "@risedle/types";

import { getBaseConfig } from "@/utils/getBaseConfig";
import { fetcher } from "@/utils/fetcher";

// Get list of markets using SWR
export function useGetInsight() {
    const { chainId } = getBaseConfig();
    const url = `https://api.risedle.com/v1/${chainId}/flts/insight/gains`;
    const { data, error } = useSWR<Array<FuseLeveragedTokenInsight>, Error>(
        url,
        fetcher
    );

    return {
        data: data,
        isLoaded: data || error ? true : false,
        error: error,
    };
}

export default useGetInsight;
