// TODO: refactor this
interface Chain {
    chainSlug: string;
    chainId: number;
    chainName: string;
}

interface BaseConfig {
    chainSlug: string;
    chainId: number;
    chainName: string;
    baseURL: string;
    supportedChains: Array<Chain>;
}

const Arbitrum = {
    chainSlug: "arbitrum",
    chainId: 42161,
    chainName: "Arbitrum",
    baseURL: "https://risedle.com/markets",
};

const BSC = {
    chainSlug: "bsc",
    chainId: 56,
    chainName: "BNB Smart Chain",
};

const supportedChains = [Arbitrum, BSC];

/**
 * Given NEXT_PUBLIC_* from configuration then return the base config
 */
export function getBaseConfig(): BaseConfig {
    const chainSlug = process.env.NEXT_PUBLIC_CHAIN_SLUG || "bsc";
    const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "56");
    const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "BNB Smart Chain";
    const baseURL = `https://${chainSlug}.risedle.com`;
    return { chainSlug, chainId, chainName, baseURL, supportedChains };
}

const config = {
    getBaseConfig,
};

export default config;
