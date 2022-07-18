import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getBaseConfig } from "../utils/getBaseConfig";

const Home: NextPage = () => {
    const baseConfig = getBaseConfig();

    return (
        <>
            <NextSeo
                title={`Trade Leveraged Tokens on ${baseConfig.chainName}`}
            />
            <div>OK</div>
        </>
    );
};

export default Home;
