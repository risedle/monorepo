export interface FuseLeveragedTokenDayData {
    open: string;
    close: string;
    tradeVolumeUSD: string;
    totalSupply: string;
    collateralPerShare: string;
    debtPerShare: string;
    totalCollateral: string;
    totalDebt: string;
}

export interface FuseLeveragedTokenPrice {
    timestamp: number;
    open: string;
    high: string;
    low: string;
    close: string;
}

export interface FuseLeveragedTokenVolume {
    timestamp: number;
    usd: string;
}

export interface FuseLeveragedTokenFee {
    timestamp: number;
    usd: string;
}

export interface FuseLeveragedTokenBackingInfo {
    name: string;
    symbol: string;
    decimal: string;
}

export interface FuseLeveragedToken {
    name: string;
    symbol: string;
    decimals: string;
    address: string;
    prices: Array<FuseLeveragedTokenPrice>;
    volumes: Array<FuseLeveragedTokenVolume>;
    fees: Array<FuseLeveragedTokenFee>;
    dailyData: Array<FuseLeveragedTokenDayData>;
    totalVolumeUSD: string;
    collateral: FuseLeveragedTokenBackingInfo;
    debt: FuseLeveragedTokenBackingInfo;
}

export interface FuseLeveragedTokens {
    tokens: Array<FuseLeveragedToken>;
}
