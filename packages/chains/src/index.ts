import { Binance } from "./binance";
import { ChainId } from "@risedle/types";

export const ALL_CHAINS = [Binance];
export const ALL_CHAIN_IDS = ALL_CHAINS.map((chain) => chain.id);

// Check wether chain id is supported or not
export function isChainIdSupported(chainId: ChainId): boolean {
    return ALL_CHAIN_IDS.includes(chainId);
}

// Export all chains
export * from "./binance";
