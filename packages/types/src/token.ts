import { ChainId } from "./chain";

export interface Token {
    name: string;
    symbol: string;
    decimals: number;
    address: Map<ChainId, string>;
}

export interface TokenTradingInfo {
    token: Token;
    priceUSD: number;
    dailyPriceChangeUSD: number;
    dailyPriceChangePercentage: number;
    volumeUSD: number;
    dailyVolumeChangeUSD: number;
    dailyVolumeChangePercentage: number;
}
