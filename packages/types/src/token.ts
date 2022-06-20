import { ChainId } from "./chain";

/// ███ Source Tokens ████████████████████████████████████████████████████████

/**
 * Source tokens is a type that represent raw pair token data:
 * (1) token address
 * (2) where to get the market data of a token
 *
 * One chain will have one source tokens.
 * */

export enum TokenInfoSource {
    PancakeSwapSubgraph,
    InternalDatabase,
}

export type SourceTokens = Map<TokenInfoSource, Array<string>>;

/// ███ Token Info  ██████████████████████████████████████████████████████████

/**
 * Given token address and its data source from SourceTokens, the collected
 * data is represented as TokenInfo
 */

export interface TokenInfo {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    priceUSD: number;
    dailyPriceChangeUSD: number;
    dailyPriceChangePercentage: number;
    volumeUSD: number;
    dailyVolumeChangeUSD: number;
    dailyVolumeChangePercentage: number;
    source: TokenInfoSource;
    totalLiquidity: number;
    totalLiquidityUSD: number;
}
