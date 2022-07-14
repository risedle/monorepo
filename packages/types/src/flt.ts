interface FuseLeveragedTokenBackingInfo {
    name: string;
    symbol: string;
    amount: number;
}

interface FuseLeveragedTokenInfo {
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
