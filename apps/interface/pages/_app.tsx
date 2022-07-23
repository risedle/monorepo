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
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { getBaseConfig } from "../utils/getBaseConfig";
import themes from "../themes";

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
};

// Rainbowkit configuration
const { chains, provider } = configureChains(
    [bscChain],
    [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
);

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
                            url: "https://risedle.com/assets/images/og/Landing.png",
                        },
                    ],
                }}
            />
            <ChakraProvider theme={themes}>
                <WagmiConfig client={wagmiClient}>
                    <RainbowKitProvider chains={chains}>
                        <Component {...pageProps} />
                    </RainbowKitProvider>
                </WagmiConfig>
            </ChakraProvider>
        </>
    );
}

export default App;
