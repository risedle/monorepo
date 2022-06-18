import { Binance } from "./binance";
import { ChainId } from "@risedle/types/chain";

export const ALL_CHAINS = [Binance];
export const ALL_CHAIN_IDS = ALL_CHAINS.map((chain) => chain.id);

// Check wether chain id is supported or not
export function isChainIdSupported(chainId: ChainId): boolean {
    return chainId in ALL_CHAIN_IDS;
}

// Export all chains
export * from "./binance";
