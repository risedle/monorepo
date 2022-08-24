import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { Container, Flex, VStack } from "@chakra-ui/react";

import getBaseConfig from "@/utils/getBaseConfig";
import { fetchFuseLeveragedTokenSymbols } from "@/utils/fetchFuseLeveragedTokenSymbols";
import { fetchFuseLeveragedTokenBySymbol } from "@/utils/fetchFuseLeveragedTokenBySymbol";
import type { FuseLeveragedToken } from "@/utils/types";

import { NavigationBar } from "@/components/NavigationBar";
import { NavigationBarBottom } from "@/components/NavigationBarBottom";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { TradeInfoCard } from "@/components/TradeInfoCard";
import { FuseLeveragedTokenInfoCard } from "@/components/FuseLeveragedTokenInfoCard";
import BackingCard from "@/components/BackingCard";
import SwapHistoryCard from "@/components/SwapHistoryCard";
import SwapCard from "@/components/SwapCard";
import StickyFooterBar from "@/components/FooterBar/Sticky";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TradeProps extends FuseLeveragedToken {}

const Trade: NextPage<TradeProps, unknown> = (props) => {
    const { chainName, baseURL, chainSlug } = getBaseConfig();
    const { symbol } = props;

    return (
        <>
            <NextSeo
                title={`Buy and Sell ${symbol} on ${chainName}`}
                openGraph={{
                    type: "website",
                    url: baseURL,
                    title: `Buy and Sell ${symbol} on ${chainName}`,
                    description:
                        "Trade, earn and build on the decentralized crypto leveraged token protocol",
                    site_name: "Risedle",
                    images: [
                        {
                            url: `https://${chainSlug}.risedle.com/opengraph/trade-${symbol}.png`,
                        },
                    ],
                }}
            />
            <NavigationBar />
            <Container
                maxW="5xl"
                py="3"
                data-testid="TradeContent"
                marginTop={{ base: "20px", laptop: "16" }}
            >
                <Flex gap={6}>
                    {/* Left Column */}
                    <VStack gap={6} width="100%">
                        <TradeInfoCard flt={props} width="100%" />
                        <FuseLeveragedTokenInfoCard flt={props} width="100%" />
                        <BackingCard flt={props} width="100%" />
                        <SwapHistoryCard flt={props} width="100%" />
                    </VStack>
                    {/* Right Column */}
                    <VStack
                        alignItems="flex-start"
                        gap={6}
                        height="400px"
                        minW="360px"
                        position="sticky"
                        top="32px"
                        display={{ base: "none", laptop: "block" }}
                    >
                        <SwapCard flt={props} />
                        <StickyFooterBar />
                    </VStack>
                </Flex>
            </Container>
            <NavigationBarBottom />
            <BackgroundGradient
                page="trade"
                display={{ base: "none", laptop: "block" }}
            />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Get list of fuse leveraged token symbols
    const data = await fetchFuseLeveragedTokenSymbols();
    const paths = data.flts.map((flt) => ({
        params: { symbol: flt.symbol.toLowerCase() },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    if (params == null) throw new Error("Trade: params is undefined");
    if (params.symbol == null) throw new Error("Trade: symbol is undefined");
    if (Array.isArray(params.symbol)) throw new Error("Trade: symbol invalid");

    // Fetch full data of FLT
    const data = await fetchFuseLeveragedTokenBySymbol(params.symbol);
    return { props: data.flts[0], revalidate: 3600 };
};

export default Trade;
