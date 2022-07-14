
export type FLTResponse = {
    symbol: string;
    name: string;
    fltHourData: Array<{
        priceUSD: number;
        totalSupply: number;
    }>;
};

export type GetGraphDataResponse = {
    flts: Array<FLTResponse>;
};

export type MarketResponse = {
    symbol: string;
    name: string;
    price: number;
}

export type GetMarketDataResponse = {
    markets: Array<MarketResponse>;
    aum: number;
}