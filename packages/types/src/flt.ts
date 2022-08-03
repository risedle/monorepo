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

export interface FuseLeveragedTokenSwap {
    hash: string;
    user: string;
    timestamp: number;
    tokenIn: {
        name: string;
        symbol: string;
    };
    amountIn: number;
    amountInUSD: number;
    tokenOut: {
        name: string;
        symbol: string;
    };
    amountOut: number;
    amountOutUSD: number;
}

export interface FuseLeveragedTokenSwaps {
    flt: Array<FuseLeveragedTokenSwap>;
    user: Array<FuseLeveragedTokenSwap>;
}
