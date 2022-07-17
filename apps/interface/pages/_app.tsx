import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
    const baseUrl = useBaseURL();

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
                opengraph={{
                    type: "website",
                    url: baseUrl,
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
            <Component {...pageProps} />;
        </>
    );
}

export default MyApp;
