import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { Container, Flex, VStack } from "@chakra-ui/react";

import getBaseConfig from "@/utils/getBaseConfig";
import { fetchFuseLeveragedTokenSymbols } from "@/utils/fetchFuseLeveragedTokenSymbols";
import { fetchFuseLeveragedTokenBySymbol } from "@/utils/fetchFuseLeveragedTokenBySymbol";
import type { FuseLeveragedToken } from "@/utils/types";

import { WarningBar } from "@/components/WarningBar";
import { NavigationBar } from "@/components/NavigationBar";
import { FooterBar } from "@/components/FooterBar";
import { NavigationBarBottom } from "@/components/NavigationBarBottom";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { TradeInfoCard } from "@/components/TradeInfoCard";
import { FuseLeveragedTokenInfoCard } from "@/components/FuseLeveragedTokenInfoCard";
import BackingCard from "@/components/BackingCard";
import SwapHistoryCard from "@/components/SwapHistoryCard";
import SwapCard from "@/components/SwapCard";

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
            <WarningBar />
            <NavigationBar />
            <Container maxW="1136px" py="3" data-testid="TradeContent">
                <Flex gap={6}>
                    {/* Left Column */}
                    <VStack flex="1" gap={6}>
                        <TradeInfoCard flt={props} width="100%" />
                        <FuseLeveragedTokenInfoCard flt={props} width="100%" />
                        <BackingCard flt={props} width="100%" />
                        <SwapHistoryCard flt={props} width="100%" />
                    </VStack>
                    {/* Right Column */}
                    <VStack flex="1" alignItems="flex-start">
                        <SwapCard symbol={symbol} />
                    </VStack>
                </Flex>
            </Container>
            <FooterBar />
            <NavigationBarBottom />
            <BackgroundGradient page="trade" />
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
