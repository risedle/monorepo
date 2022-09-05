// This is static token definition
// Map chainId -> address -> "name" -> value
// Map chainId -> address -> "symbol" -> value
// Map chainId -> address -> "decimals" -> value
export const TokenMap = new Map<string, Map<string, Map<string, string>>>();

// WETH on Arbitrum
const ArbitrumWETH = new Map<string, string>();
ArbitrumWETH.set("name", "Wrapped Ethereum");
ArbitrumWETH.set("symbol", "WETH");
ArbitrumWETH.set("decimals", "18");

// USDC on Arbitrum
const ArbitrumUSDC = new Map<string, string>();
ArbitrumUSDC.set("name", "USD Coin");
ArbitrumUSDC.set("symbol", "USDC");
ArbitrumUSDC.set("decimals", "6");

// Arbitrum token map
const ArbitrumTokenMap = new Map<string, Map<string, string>>();
ArbitrumTokenMap.set(
    "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    ArbitrumWETH
);
ArbitrumTokenMap.set(
    "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    ArbitrumUSDC
);

TokenMap.set("42161", ArbitrumTokenMap);
