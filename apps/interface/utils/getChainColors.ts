import { getBaseConfig } from "./getBaseConfig";
/**
 * Get chain's accent color
 */
export function getChainColors(): string {
    const baseConfig = getBaseConfig();

    // Chain specific styles
    switch (baseConfig.chainId) {
        // TODO(pyk): use chainId from @risedle/types here
        case 56:
            return [
                "dark:text-amber-dark-11",
                "text-amber-light-11",
                "dark:fill-amber-dark-11",
                "fill-amber-light-11",
                "dark:divide-amber-dark-11/10",
                "divide-amber-light-11/10",
            ].join(" ");
        default:
            return "text-black";
    }
}
