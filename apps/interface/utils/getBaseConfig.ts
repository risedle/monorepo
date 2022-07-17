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
    const chainSlug = process.env.NEXT_PUBLIC_CHAIN_SLUG || "slug";
    const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "88");
    const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "Slug";
    const baseURL = `https://${chainSlug}.risedle.com`;
    return { chainSlug, chainId, chainName, baseURL };
}
