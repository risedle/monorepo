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
            <NavigationBar />
        </>
    );
};

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    console.log("DEBUG: pages/index.tsx: OK");

    // Pass data to the page via props
    return { props: {} };
}

export default Home;
