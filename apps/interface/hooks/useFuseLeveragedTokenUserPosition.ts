import useSWR from "swr";
import { FuseLeveragedTokenUserPosition } from "@risedle/types";

import { getBaseConfig } from "../utils/getBaseConfig";
import { fetcher } from "../utils/fetcher";

// Get list of markets using SWR
export function useFuseLeveragedTokenUserPosition(
    fltAddress: string,
    userAddress: string
) {
    const { chainId } = getBaseConfig();
    const positionId = `${userAddress}-${fltAddress}`;
    const url = `https://api.risedle.com/v1/${chainId}/positions/${positionId}`;
    const { data, error } = useSWR<FuseLeveragedTokenUserPosition, Error>(
        url,
        fetcher
    );

    return {
        data: data,
        isLoaded: data ? true : false,
        error: error,
    };
}

export default useFuseLeveragedTokenUserPosition;
