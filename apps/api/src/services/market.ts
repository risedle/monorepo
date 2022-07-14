import { request as grequest, gql } from "graphql-request";
import { getSourceMarketsByChainId } from "@risedle/tokens";
import {
    ChainId,
    GetMarketDataResponse,
    GetGraphDataResponse,
} from "@risedle/types";
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

export async function getMarketsData(
    chainId: ChainId
): Promise<GetMarketDataResponse | undefined> {
    const { flts }: GetGraphDataResponse = await grequest(
        getSourceMarketsByChainId(chainId),
        queryMarket
    );
    let aum = 0;
    const mappedData = flts.map((data) => {
        const { fltHourData, ...restData } = data;
        const result = {
            ...restData,
            price: fltHourData[0]?.priceUSD,
        };
        aum = aum + fltHourData[0]?.totalSupply * fltHourData[0]?.priceUSD;
        return result;
    });

    return { markets: mappedData, aum };
}
