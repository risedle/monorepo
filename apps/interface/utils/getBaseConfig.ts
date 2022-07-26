// TODO: refactor this
interface Chain {
    chainSlug: string;
    chainId: number;
    chainName: string;
    baseURL: string;
    graphEndpoint: string;
    explorerName: string;
    explorerURL: string;
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
