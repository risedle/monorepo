import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import type { FuseLeveragedTokenInfo } from "@risedle/types";
import { NextSeo } from "next-seo";

import { getBaseConfig } from "../../utils/getBaseConfig";
import { fetchFuseLeveragedTokenSymbols } from "../../utils/fetchFuseLeveragedTokenSymbols";
import { fetchFuseLeveragedTokenBySymbol } from "../../utils/fetchFuseLeveragedTokenBySymbol";

import { WarningBar } from "../../components/WarningBar";
import { NavigationBar } from "../../components/NavigationBar";
import { FooterBar } from "../../components/FooterBar";
import { NavigationBarBottom } from "../../components/NavigationBarBottom";

const Trade: NextPage<TradeProps, unknown> = (props) => {
    console.debug("DEBUG: Trade: props", props);
    const { chainName } = getBaseConfig();
    const { symbol } = props;

    return (
        <>
            <NextSeo title={`Buy and Sell ${symbol} on ${chainName}`} />
            <WarningBar />
            <NavigationBar />
            <FooterBar />
            <NavigationBarBottom />
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Get list of fuse leveraged token symbols
    const data = await fetchFuseLeveragedTokenSymbols();
    const paths = data.symbols.map((flt) => ({
        params: { symbol: flt.symbol.toLowerCase() },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;

    // Fetch full data of FLT
    const data = await fetchFuseLeveragedTokenBySymbol(params.symbol);
    return { props: data.flts[0], revalidate: 3600 };
};

export default Trade;
