interface BaseConfig {
    chainSlug: string;
    chainId: number;
    chainName: string;
    baseURL: string;
}

/**
 * Given NEXT_PUBLIC_* from configuration then return the base config
 */
export function getBaseConfig(): BaseConfig {
    const chainSlug = process.env.NEXT_PUBLIC_CHAIN_SLUG || "bsc";
    const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "56");
    const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "BNB Smart Chain";
    const baseURL = `https://${chainSlug}.risedle.com`;
    return { chainSlug, chainId, chainName, baseURL };
}

const config = {
    getBaseConfig,
};

if (typeof window !== "undefined") {
    //here `window` is available
    window.BaseConfig = config;
}

export default config;
