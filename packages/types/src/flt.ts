export interface FuseLeveragedTokenBackingInfo {
    name: string;
    symbol: string;
    amount: number;
    decimals: number;
    change: number;
    changePercent: number;
}

export interface FuseLeveragedTokenInfo {
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    priceUSD: number;
    dailyPriceChangeUSD: number;
    dailyPriceChangePercentage: number;
    totalVolumeUSD: number;
    dailyVolumeChangeUSD: number;
    dailyVolumeChangePercentage: number;
    marketcapUSD: number;
    maxMarketcapUSD: number;
    collateral: FuseLeveragedTokenBackingInfo;
    debt: FuseLeveragedTokenBackingInfo;
    totalCollateral: number;
    totalDebt: number;
}

export interface FuseLeveragedTokenUserPosition {
    balance: number;
    usd: number; // usd value of current balance
    pnlUSD: number; // open p/l in USD
    pnlPercent: number; // open p/l in percentage
}

export interface FuseLeverageSwaps {
    timestamp: number;
    hash: string;
    user: string;
    amountIn: number;
    amountInUSD: number;
    amountOut: number;
    amountOutUSD: number;
    tokenIn: {
        name: string;
        symbol: string;
    };
    tokenOut: {
        name: string;
        symbol: string;
    };
}

export interface FuseLeverageSwapsHistory {
    flt: Array<FuseLeverageSwaps>;
    user: Array<FuseLeverageSwaps>;
}