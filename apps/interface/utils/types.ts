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

export interface FuseLeveragedTokenBacking {
    timestamp: number;
    collateralPerShare: string;
    debtPerShare: string;
}

export interface FuseLeveragedToken {
    name: string;
    symbol: string;
    decimals: string;
    address: string;
    minLeverageRatio: string;
    maxLeverageRatio: string;
    prices: Array<FuseLeveragedTokenPrice>;
    volumes: Array<FuseLeveragedTokenVolume>;
    fees: Array<FuseLeveragedTokenFee>;
    totalVolumeUSD: string;
    collateral: FuseLeveragedTokenBackingInfo;
    debt: FuseLeveragedTokenBackingInfo;
    backings: Array<FuseLeveragedTokenBacking>;
}

export interface FuseLeveragedTokens {
    tokens: Array<FuseLeveragedToken>;
}
