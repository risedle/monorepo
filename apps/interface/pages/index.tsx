import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getBaseConfig } from "../utils/getBaseConfig";
import { WarningBar } from "../components/WarningBar";

const Home: NextPage = () => {
    const baseConfig = getBaseConfig();

    return (
        <>
            <NextSeo
                title={`Trade Leveraged Tokens on ${baseConfig.chainName}`}
            />
            <WarningBar />
        </>
    );
};

export default Home;
