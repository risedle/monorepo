import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { getBaseConfig } from "../utils/getBaseConfig";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
// import "@fontsource/ibm-plex-mono/700.css";

// TODO(pyk): refactor this chakra theming approach once we ready
// What we need:
// 1. Custom color based on chain
// 2. Custom color based on color mode

const baseConfig = getBaseConfig();

// TODO: use Chain ID

const baseColors = {
    amber: {
        light: {
            11: "#AD5700",
        },
        dark: {
            11: "#F1A10D",
        },
    },
    gray: {
        light: {
            2: "#F8F8F8",
            4: "#EDEDED",
            10: "#858585",
            11: "#6F6F6F",
            12: "#171717",
        },
        dark: {
            2: "#1C1C1C",
            4: "#282828",
            10: "#7E7E7E",
            11: "#A0A0A0",
            12: "#EDEDED",
        },
    },
    bsc: "#F3BA2C",
};

const warningBarDividerColors = {
    light: {
        56: baseColors.amber.light["11"],
    },
    dark: {
        56: baseColors.amber.dark["11"],
    },
};

const colors = {
    ...baseColors,
    warningBar: {
        active: {
            light: warningBarDividerColors.light[baseConfig.chainId],
            dark: warningBarDividerColors.dark[baseConfig.chainId],
        },
        base: {
            light: baseColors.gray.light["11"],
            dark: baseColors.gray.dark["11"],
        },
    },
};

const theme = extendTheme({
    colors,
    ronts: {
        body: '"Inter", sans-serif;',
    },
    config: {
        cssVarPrefix: "risedle",
    },
    initialColorMode: "dark",
    useSystemColorMode: false,
});

function App({ Component, pageProps }: AppProps) {
    const baseConfig = getBaseConfig();

    return (
        <>
            <DefaultSeo
                titleTemplate="%s | Risedle"
                defaultTitle="Risedle"
                description="Trade, earn and build on the decentralized crypto leveraged ETFs market protocol"
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
                        "Trade, earn and build on the decentralized crypto leveraged ETFs market protocol",
                    site_name: "Risedle",
                    images: [
                        {
                            url: "https://risedle.com/assets/images/og/Landing.png",
                        },
                    ],
                }}
            />
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
}

export default App;
