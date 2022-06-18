// Chain IDs
export enum ChainId {
    BSC = 56,
    BSC_TESTNET = 97,
}

export interface Chain {
    id: ChainId;
    name: string;
    symbol: string;
    currency: string;
}
