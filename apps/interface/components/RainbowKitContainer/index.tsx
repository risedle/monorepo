import {
    RainbowKitProvider,
    lightTheme,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import { useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Chain, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const bscChain: Chain = {
    id: 56,
    name: "BNB Smart Chain",
    network: "bsc",
    iconUrl: "https://example.com/icon.svg",
    iconBackground: "#fff",
    nativeCurrency: {
        decimals: 18,
        name: "BNB",
        symbol: "BNB",
    },
    rpcUrls: {
        default: "https://bscrpc.com",
    },
    blockExplorers: {
        etherscan: {
            name: "BNB Smart Chain Explorer",
            url: "https://bscscan.com",
        },
        default: {
            name: "BNB Smart Chain Explorer",
            url: "https://bscscan.com",
        },
    },
    testnet: false,
    multicall: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 15921452,
    },
};

// Rainbowkit configuration
const { chains, provider } = configureChains([bscChain], [publicProvider()]);

const { connectors } = getDefaultWallets({
    appName: "Risedle",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

const RainbowKitContainer = ({ children }: { children: ReactNode }) => {
    const { colorMode } = useColorMode();

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                theme={colorMode === "dark" ? darkTheme() : lightTheme()}
                chains={chains}
            >
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default RainbowKitContainer;
