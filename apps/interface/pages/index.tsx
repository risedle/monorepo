import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getBaseConfig } from "../utils/getBaseConfig";
import { NavigationBar } from "../components/NavigationBar";
// import { WarningBar } from "../components/WarningBar";
import { NewWarningBar } from "../components/WarningBar/WarningBar";
import { BannerBSC } from "../components/BannerBSC/BannerBSC";

const Home: NextPage = () => {
    const baseConfig = getBaseConfig();

    return (
        <>
            <NextSeo
                title={`Trade Leveraged Tokens on ${baseConfig.chainName}`}
            />
            {/* <NewWarningBar /> */}
            <BannerBSC />
            {/* <WarningBar /> */}
            <NavigationBar tradeActive />
        </>
    );
};

export default Home;
