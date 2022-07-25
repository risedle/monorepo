import useSWR from "swr";
import { FuseLeveragedTokenUserPosition } from "@risedle/types";

import { getBaseConfig } from "../utils/getBaseConfig";
import { fetcher } from "../utils/fetcher";

// Get list of markets using SWR
export function useFuseLeveragedTokenUserPosition(
    fltAddress: string,
    userAddress: string | undefined
) {
    // Return early if user addy is undefined
    const { chainId } = getBaseConfig();
    const positionId = `${userAddress}-${fltAddress}`;
    // Set URL to null in order to prevent the request
    // https://swr.vercel.app/docs/conditional-fetching#dependent
    const url = userAddress
        ? `https://api.risedle.com/v1/${chainId}/positions/${positionId}`
        : null;
    const { data, error } = useSWR<FuseLeveragedTokenUserPosition, Error>(
        url,
        fetcher
    );

    return {
        data: data,
        isLoaded: data || userAddress == null ? true : false,
        error: error,
    };
}

export default useFuseLeveragedTokenUserPosition;
