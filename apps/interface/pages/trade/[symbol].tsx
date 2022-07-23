import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { Container, SimpleGrid, Box } from "@chakra-ui/react";

import { getBaseConfig } from "../../utils/getBaseConfig";
import { fetchFuseLeveragedTokenSymbols } from "../../utils/fetchFuseLeveragedTokenSymbols";
import { fetchFuseLeveragedTokenBySymbol } from "../../utils/fetchFuseLeveragedTokenBySymbol";
import type { FuseLeveragedToken } from "../../utils/types";

import { WarningBar } from "../../components/WarningBar";
import { NavigationBar } from "../../components/NavigationBar";
import { FooterBar } from "../../components/FooterBar";
import { NavigationBarBottom } from "../../components/NavigationBarBottom";
import { BackgroundGradient } from "../../components/BackgroundGradient";
import { SwapCard } from "../../components/SwapCard";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TradeProps extends FuseLeveragedToken {}

const Trade: NextPage<TradeProps, unknown> = (props) => {
    console.debug("DEBUG: Trade: props", props);
    const { chainName } = getBaseConfig();
    const { symbol } = props;

    return (
        <>
            <NextSeo title={`Buy and Sell ${symbol} on ${chainName}`} />
            <WarningBar />
            <NavigationBar />
            <Container maxW="1136px" py="3" data-testid="TradeContent">
                <SimpleGrid
                    columns={{ base: 1, laptop: 2 }}
                    spacing="6"
                    margin="auto"
                    maxW={{ base: "400px", laptop: "730px", desktop: "100%" }}
                >
                    <SwapCard {...props} />
                    <Box>1</Box>
                    <Box>1</Box>
                </SimpleGrid>
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
