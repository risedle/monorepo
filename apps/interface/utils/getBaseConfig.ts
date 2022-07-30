// TODO: refactor this
interface Chain {
    chainSlug: string;
    chainId: number;
    chainName: string;
    baseURL: string;
    graphEndpoint: string;
    explorerName: string;
    explorerURL: string;
    defaultQuoteAddress: string;
    defaultQuoteSymbol: string;
    defaultQuoteDecimals: number;
    defaultQuoteChainlinkAddress: string;
    defaultQuoteChainlinkDecimals: number;
    routerAddress: string;
}

interface BaseConfig extends Chain {
    supportedChains: Array<Chain>;
}

const Arbitrum = {
    chainSlug: "arbitrum",
    chainId: 42161,
    chainName: "Arbitrum",
    baseURL: "https://risedle.com/markets",
    graphEndpoint: "",
    explorerName: "Arbiscan",
    explorerURL: "https://arbiscan.io",
    defaultQuoteAddress: "",
    defaultQuoteSymbol: "",
    defaultQuoteDecimals: 18,
    defaultQuoteChainlinkAddress: "",
    defaultQuoteChainlinkDecimals: 8,
    routerAddress: "",
};

const BSC = {
    chainSlug: "bsc",
    chainId: 56,
    chainName: "BNB Smart Chain",
    baseURL: "https://bsc.risedle.com",
    graphEndpoint:
        "https://api.thegraph.com/subgraphs/name/risedle/risedle-flt-bsc",
    explorerName: "BscScan",
    explorerURL: "https://bscscan.com",
    defaultQuoteAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    defaultQuoteSymbol: "BUSD",
    defaultQuoteDecimals: 18,
    defaultQuoteChainlinkAddress: "0xcBb98864Ef56E9042e7d2efef76141f15731B82f",
    defaultQuoteChainlinkDecimals: 8,
    routerAddress: "0x8888888C0A5BE14f3FC72a8c97eC489DEE9c4460",
};

const supportedChains = [Arbitrum, BSC];

const baseConfigs = {
    bsc: BSC,
    arbitrum: Arbitrum,
};

/**
 * Given NEXT_PUBLIC_CHAIN_SLUG from configuration then return the base config
 */
export function getBaseConfig(): BaseConfig {
    const chainSlug = process.env.NEXT_PUBLIC_CHAIN_SLUG || "bsc";
    // @ts-ignore
    return { ...baseConfigs[chainSlug], supportedChains };
}

export default getBaseConfig;
