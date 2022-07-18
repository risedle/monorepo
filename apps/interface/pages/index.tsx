import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getBaseConfig } from "../utils/getBaseConfig";
import { getChainColors } from "../utils/getChainColors";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { ChainIcon } from "../components/ChainIcon";

const WarningBarContent = () => {
    const baseConfig = getBaseConfig();
    const chainColors = getChainColors();

    // Base styles
    const styles = {
        content: [
            "flex",
            "flex-row",
            "divide-x",
            "min-w-[375px]",
            chainColors,
        ].join(" "),
        textContainer: [
            "flex",
            "flex-row",
            "items-center",
            "px-8",
            "gap-1",
        ].join(" "),
        textBase: [
            "font-semibold",
            "text-xs",
            "leading-4",
            "tracking-tight",
            "text-gray-light-11",
            "dark:text-gray-dark-11",
            "fill-gray-light-11",
            "dark:fill-gray-dark-11",
            "shrink-0",
        ].join(" "),
        textChain: [
            "font-semibold",
            "text-xs",
            "leading-4",
            "tracking-tight",
            "shrink-0",
            chainColors,
        ].join(" "),
    };
    return (
        <>
            <div data-testid="WarningBarContent" className={styles.content}>
                {/* Use at your own risk + Logo */}
                <div className={styles.textContainer}>
                    <div className={styles.textChain}>
                        Use at your own risk
                    </div>
                    <div>
                        <ChainIcon className={styles.textChain} />
                    </div>
                </div>
                {/* end of use at yout own risk + logo */}

                {/* Chain name + Logo */}
                <div className={styles.textContainer}>
                    <div className={styles.textBase}>
                        {`${baseConfig.chainName}`}
                    </div>
                    <div>
                        <ChainIcon className={styles.textBase} />
                    </div>
                </div>
                {/* end of chain name + logo */}
            </div>
        </>
    );
};

const WarningBar = () => {
    // Chain specific colors
    const chainColors = getChainColors();

    // Fill the current windown
    const dim = useWindowDimensions();
    const contentAmount = Math.round(dim.width / 375 + 1);

    // Base styles
    const styles = {
        contentContainer: [
            "flex",
            "flex-row",
            "divide-x",
            chainColors,
            "py-3",
            "border-b",
            "border-gray-light-4",
            "dark:border-gray-dark-4",
            "overflow-x-hidden",
        ].join(" "),
    };

    return (
        <div data-testid="WarningBar" className={styles.contentContainer}>
            {Array.from(Array(contentAmount), (e, i) => {
                return <WarningBarContent key={i} />;
            })}
        </div>
    );
};

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
