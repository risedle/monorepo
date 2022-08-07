import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-mono/600.css";

import "@rainbow-me/rainbowkit/styles.css";

// Rainbowkit
import {
    Chain,
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import NextNProgress from "nextjs-progressbar";

import themes from "@/themes";
import colors from "@/themes/colors";
import getBaseConfig from "@/utils/getBaseConfig";
import { useChakraThemeStore } from "@/hooks/useChakraThemeStore";
import shallow from "zustand/shallow";

// TODO(pyk): refactor this
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

function App({ Component, pageProps }: AppProps) {
    const baseConfig = getBaseConfig();

    const { theme } = useChakraThemeStore(
        (state) => ({ theme: state.theme }),
        shallow
    );

    return (
        <>
            <DefaultSeo
                titleTemplate="%s | Risedle"
                defaultTitle="Risedle"
                description="Trade, earn and build on the decentralized crypto leveraged token protocol"
                canonical="https://risedle.com"
                twitter={{
                    cardType: "summary_large_image",
                    site: "@risedle",
                    handle: "@risedle",
                }}
                openGraph={{
                    type: "website",
                    url: baseConfig.baseURL,
                    title: "Trade on Risedle",
                    description:
                        "Trade, earn and build on the decentralized crypto leveraged token protocol",
                    site_name: "Risedle",
                    images: [
                        {
                            url: `https://${baseConfig.chainSlug}.risedle.com/opengraph/home-${baseConfig.chainSlug}.png`,
                        },
                    ],
                }}
            />
            <ChakraProvider theme={themes}>
                <WagmiConfig client={wagmiClient}>
                    <RainbowKitProvider
                        chains={chains}
                        theme={theme === "dark" ? darkTheme() : undefined}
                    >
                        <NextNProgress color={colors.amber.light[11]} />
                        <Component {...pageProps} />
                    </RainbowKitProvider>
                </WagmiConfig>
            </ChakraProvider>
        </>
    );
}

export default App;
