/**
 * Given NEXT_PUBLIC_CHAIN_SLUG from configuration then return the base url
 */
export function useBaseURL(): string {
    return `https://${process.env.NEXT_PUBLIC_CHAIN_SLUG}.risedle.com`;
}
