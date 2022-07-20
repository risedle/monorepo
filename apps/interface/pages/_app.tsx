import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
// import "@fontsource/ibm-plex-mono/700.css";

import { getBaseConfig } from "../utils/getBaseConfig";
import theme from "../utils/theme";

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
