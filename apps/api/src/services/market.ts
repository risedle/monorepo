import { request as grequest, gql } from "graphql-request";
import { getUrlGraphByChainId } from "@risedle/tokens";
import { ChainId, GetMarketDataResponse } from "@risedle/types";
const queryMarket = gql`
    {
        flts {
            symbol
            name
            fltHourData(
                first: 1
                orderBy: periodStartUnix
                orderDirection: desc
            ) {
                priceUSD
                totalSupply
            }
        }
    }
`;

export async function getMarketsData(chainId: ChainId) {
    try {
        const { flts }: GetMarketDataResponse = await grequest(
            getUrlGraphByChainId(chainId),
            queryMarket
        );
        let aum = 0;
        const result = flts.map((data) => {
            const { fltHourData, ...restData } = data;
            const result = {
                ...restData,
                price: fltHourData[0]?.priceUSD,
            };
            aum = aum + fltHourData[0]?.totalSupply * fltHourData[0]?.priceUSD;
            return result;
        });
        return { markets: result, aum, status: 200 };
    } catch (e) {
        return { e, status: 400 };
    }
}
