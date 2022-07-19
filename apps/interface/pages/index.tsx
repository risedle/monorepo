import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getBaseConfig } from "../utils/getBaseConfig";
import { WarningBar } from "../components/WarningBar";
import { NavigationBar } from "../components/NavigationBar";

const Home: NextPage = () => {
    const baseConfig = getBaseConfig();

    return (
        <>
            <NextSeo
                title={`Trade Leveraged Tokens on ${baseConfig.chainName}`}
            />
            <WarningBar />
            <NavigationBar tradeActive />
        </>
    );
};

export default Home;
