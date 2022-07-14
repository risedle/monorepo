export type FLTResponse = {
    symbol: string;
    name: string;
    fltHourData: Array<{
        priceUSD: number;
        totalSupply: number;
    }>;
};

export type GetMarketDataResponse = {
    flts: Array<FLTResponse>;
};
