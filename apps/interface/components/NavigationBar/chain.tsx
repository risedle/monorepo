import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChainIcon } from "../ChainIcon";
import { getBaseConfig, getSupportedChains } from "../../utils/getBaseConfig";

export const NavigationBarChainSwitcher = () => {
    const baseConfig = getBaseConfig();

    const styles = {
        button: [
            "flex",
            "flex-row",
            "items-center",
            "gap-2",
            "bg-gray-light-2",
            "dark:bg-dray-dark-2",
            "border-gray-light-4",
            "dark:border-gray-dark-4",
            "py-3",
            "px-6",
            "rounded-full",
        ].join(" "),
        chainContainer: ["flex", "flex-row", "gap-1"].join(" "),
        chainName: [
            "font-semibold",
            "text-sm",
            "leading-4",
            "tracking-tight",
            "text-gray-light-12",
            "dark:text-gray-dark-12",
        ].join(" "),
    };

    // For BSC Only (?)
    let chainClass = "";
    if (baseConfig.chainId == 56) {
        chainClass = "fill-bsc";
    }

    // Dropdown selections
    const chains = baseConfig.supportedChains.filter(
        (c) => c.chainId != baseConfig.chainId
    );
    const chainSelections = chains.map((chain) => {
        return (
            <div key={chain.chainId} className={styles.chainContainer}>
                <a href={chain.baseURL} className={styles.chainContainer}>
                    <ChainIcon />
                    <div className={styles.chainName}>{chain.chainName}</div>
                </a>
            </div>
        );
    });

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                data-testid="NavigationBarChainSwitcherButton"
                className={styles.button}
            >
                <div className={styles.chainContainer}>
                    <ChainIcon className={chainClass} />
                    <div className={styles.chainName}>
                        {baseConfig.chainName}
                    </div>
                </div>
                <div>
                    <svg
                        className="fill-gray-light-12 dark:fill-gray-dark-12"
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.13523 6.65803C3.3241 6.45657 3.64052 6.44637 3.84197 6.63523L7.5 10.0646L11.158 6.63523C11.3595 6.44637 11.6759 6.45657 11.8648 6.65803C12.0536 6.85949 12.0434 7.17591 11.842 7.36477L7.84197 11.1148C7.64964 11.2951 7.35036 11.2951 7.15803 11.1148L3.15803 7.36477C2.95657 7.17591 2.94637 6.85949 3.13523 6.65803Z"
                        />
                    </svg>
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                data-testid="NavigationBarChainSwitcherContent"
                className="test ok h-[100px] w-[100px] z-10"
            >
                {chainSelections}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};
