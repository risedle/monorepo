import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Container } from "@chakra-ui/react";

import getBaseConfig from "@/utils/getBaseConfig";

import NavigationBar from "@/components/NavigationBar";
import { NavigationBarBottom } from "@/components/NavigationBarBottom";
import { BackgroundGradient } from "@/components/BackgroundGradient";

interface PortfolioProps {}

const Portfolio: NextPage<PortfolioProps> = () => {
    const { chainName, baseURL, chainSlug } = getBaseConfig();
    return (
        <>
            <NextSeo
                title={`Trade Leveraged Tokens on ${chainName}`}
                openGraph={{
                    type: "website",
                    url: baseURL,
                    title: `Trade Leveraged Tokens on ${chainName}`,
                    description:
                        "Trade, earn and build on the decentralized crypto leveraged token protocol",
                    site_name: "Risedle",
                    images: [
                        {
                            url: `https://${chainSlug}.risedle.com/opengraph/portfolio-${chainSlug}.png`,
                        },
                    ],
                }}
            />
            <NavigationBar />
            <Container
                maxW="5xl"
                py="3"
                data-testid="PortfolioContent"
                marginTop={{ base: "20px", laptop: "16" }}
            >
                {/* Content Here */}
            </Container>
            <NavigationBarBottom />
            <BackgroundGradient
                page="trade"
                display={{ base: "none", laptop: "block" }}
            />
        </>
    );
};

export default Portfolio;
