export interface FuseLeveragedTokenBackingInfo {
    name: string;
    symbol: string;
    amount: number;
    decimals: number;
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
