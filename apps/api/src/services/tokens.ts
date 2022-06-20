import { ChainId, TokenInfo, TokenInfoSource } from "@risedle/types";
import { getSourceTokensByChainId } from "@risedle/tokens";
import { request as grequest, gql } from "graphql-request";

async function getTokensByChainId(
    chainId: ChainId
): Promise<Array<TokenInfo>> {
    // Get source tokens first
    const sourceTokens = getSourceTokensByChainId(chainId);
    if (sourceTokens == undefined) return [];

    // Fetch TokenInfo based on their source
    let tokenInfos: Array<TokenInfo> = [];
    for (let [source, addresses] of sourceTokens) {
        switch (source) {
            case TokenInfoSource.PancakeSwapSubgraph:
                const infos = await getTokenInfoFromPancakeSwapSubgraph(
                    addresses
                );
                tokenInfos = tokenInfos.concat(
                    // Remove undefined element
                    infos.filter((info): info is TokenInfo => !!info)
                );
                continue;
            default:
                continue;
        }
    }
    return tokenInfos;
}

/// ███ PancakeSwap  █████████████████████████████████████████████████████████
const pancakeSwapEndpoint =
    "https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2";

const pancakeSwapQuery = gql`
    query getTokensData($addresses: [ID!]) {
        tokens(where: { id_in: $addresses }) {
            id
            name
            symbol
            decimals
            tradeVolumeUSD
            derivedUSD
            totalLiquidity

            tokenDayData(orderBy: date, orderDirection: desc, first: 2) {
                date
                priceUSD
                dailyVolumeUSD
                totalLiquidityUSD
            }
        }
    }
`;

/**
 * Fetch token Info directly from pancake swap
 */
export async function getTokenInfoFromPancakeSwapSubgraph(
    addresses: Array<string>
): Promise<Array<TokenInfo | undefined>> {
    // Check
    if (addresses.length == 0) return [];

    // External request
    const data = await grequest(pancakeSwapEndpoint, pancakeSwapQuery, {
        addresses: addresses,
    });

    let tokenInfoMap = new Map<string, TokenInfo>();
    const tokens = data.tokens;
    for (let tokenInfo of tokens) {
        // Get price and volume data
        const todayPriceUSD = parseFloat(tokenInfo.tokenDayData[0].priceUSD);
        const yesterdayPriceUSD = parseFloat(
            tokenInfo.tokenDayData[1].priceUSD
        );
        const todayVolumeUSD = parseFloat(
            tokenInfo.tokenDayData[0].dailyVolumeUSD
        );
        const yesterdayVolumeUSD = parseFloat(
            tokenInfo.tokenDayData[1].dailyVolumeUSD
        );

        // Derive data
        const dailyPriceChangeUSD = yesterdayPriceUSD - todayPriceUSD;
        const dailyPriceChangePercentage =
            dailyPriceChangeUSD / yesterdayPriceUSD;
        const dailyVolumeChangeUSD = yesterdayVolumeUSD - todayVolumeUSD;
        const dailyVolumeChangePercentage =
            dailyVolumeChangeUSD / yesterdayVolumeUSD;

        tokenInfoMap.set(tokenInfo.id, {
            name: tokenInfo.name,
            symbol: tokenInfo.symbol,
            decimals: parseInt(tokenInfo.decimals),
            address: tokenInfo.id,
            priceUSD: parseFloat(tokenInfo.derivedUSD),
            dailyPriceChangeUSD,
            dailyPriceChangePercentage,
            volumeUSD: parseFloat(tokenInfo.tradeVolumeUSD),
            dailyVolumeChangeUSD,
            dailyVolumeChangePercentage,
            source: TokenInfoSource.PancakeSwapSubgraph,
            totalLiquidity: parseFloat(tokenInfo.totalLiquidity),
            totalLiquidityUSD: parseFloat(
                tokenInfo.tokenDayData[0].totalLiquidityUSD
            ),
        });
    }

    // Return as ordered
    return addresses.map((addy) => tokenInfoMap.get(addy));
}

const tokensService = {
    getTokensByChainId,
    getTokenInfoFromPancakeSwapSubgraph,
};

export default tokensService;
