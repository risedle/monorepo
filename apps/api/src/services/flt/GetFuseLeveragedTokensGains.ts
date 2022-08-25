import { ChainId } from "@risedle/types";
import { request as grequest, gql } from "graphql-request";
import { getGraphEndpointByChainId } from "../flts";

const queryFuseLeveragedTokenPriceData = gql`
    {
        flts {
            id
            symbol
            name
            daily: fltDayData(
                orderDirection: desc
                orderBy: periodStartUnix
                first: 1
            ) {
                open
                close
                timestmap: periodStartUnix
            }
            prevWeek: fltDayData(
                orderDirection: desc
                orderBy: periodStartUnix
                skip: 7
                first: 1
            ) {
                open
                close
                timestmap: periodStartUnix
            }
        }
    }
`;

type FltDataType = {
    open: string;
    close: string;
    timestmap: number;
};

const GetFuseLeveragedTokensGains = async (chainId: ChainId) => {
    const endpoint = getGraphEndpointByChainId(chainId);
    const data = await grequest(endpoint, queryFuseLeveragedTokenPriceData);
    if (data.flts) {
        return data.flts.map?.(
            (token: {
                id: string;
                symbol: string;
                name: string;
                daily: Array<FltDataType>;
                prevWeek: Array<FltDataType>;
            }) => {
                const openToday = parseFloat(token?.daily[0]?.open);
                const closeToday = parseFloat(token?.daily[0]?.close);
                const openPrevWeek = parseFloat(token?.prevWeek[0].open);
                return {
                    symbol: token.symbol,
                    name: token.name,
                    dailyGain: {
                        gain: ((closeToday - openToday) / openToday) * 100,
                        timestamp: token.daily[0]?.timestmap,
                    },
                    weeklyGain: {
                        gain:
                            ((closeToday - openPrevWeek) / openPrevWeek) * 100,
                        timestampStart: token.prevWeek[0]?.timestmap,
                        timestampEnd: token.daily[0]?.timestmap,
                    },
                };
            }
        );
    }
    throw "Something went wrong";
};

export default GetFuseLeveragedTokensGains;
