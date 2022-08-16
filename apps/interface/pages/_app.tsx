import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-mono/600.css";

import "@rainbow-me/rainbowkit/styles.css";

import NextNProgress from "nextjs-progressbar";

import themes from "@/themes";
import colors from "@/themes/colors";
import getBaseConfig from "@/utils/getBaseConfig";
import RainbowKitContainer from "@/components/RainbowKitContainer";

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
                            url: `https://${baseConfig.chainSlug}.risedle.com/opengraph/home-${baseConfig.chainSlug}.png`,
                        },
                    ],
                }}
            />
            <ChakraProvider theme={themes}>
                <RainbowKitContainer>
                    <NextNProgress color={colors.amber.light[11]} />
                    <Component {...pageProps} />
                </RainbowKitContainer>
            </ChakraProvider>
        </>
    );
}

export default App;
