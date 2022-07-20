import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import { getBaseConfig } from "../utils/getBaseConfig";
import { WarningBar } from "../components/WarningBar";
import { NavigationBar } from "../components/NavigationBar";

import {
    Container,
    Flex,
    Center,
    Spacer,
    HStack,
    VStack,
    Box,
    Text,
    useColorModeValue,
    Divider,
} from "@chakra-ui/react";

const Heading = () => {
    const gray9 = useColorModeValue("gray.light.9", "gray.dark.9");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Container
            maxW="7xl"
            py="3"
            data-testid="Heading"
            marginTop={{ base: "52px", tablet: "108px" }}
        >
            <Flex flexDirection={{ base: "column", tablet: "row" }}>
                <Text
                    fontWeight="bold"
                    fontSize="32px"
                    lineHeight="32px"
                    letterSpacing="tight"
                    color={gray12}
                    marginTop="auto" // align vertical bottom
                    textAlign={{ base: "center", tablet: "left" }}
                    marginBottom={{ base: "6", tablet: "0" }}
                >
                    Leveraged Tokens
                </Text>
                <Spacer />
                <HStack spacing="6" margin={{ base: "auto", tablet: 0 }}>
                    <VStack spacing="2">
                        <Text
                            fontSize="xs"
                            lineHeight="4"
                            color={gray10}
                            marginLeft={{ base: "0", tablet: "auto" }}
                        >
                            Total MCap
                        </Text>
                        <Text
                            fontSize="20px"
                            fontWeight="semibold"
                            lineHeight="7"
                            color={gray12}
                            fontFamily="mono"
                            letterSpacing="tight"
                        >
                            $123,134.12
                        </Text>
                    </VStack>
                    <VStack spacing="2">
                        <Text
                            fontSize="xs"
                            lineHeight="4"
                            color={gray10}
                            marginLeft={{ base: "0", tablet: "auto" }}
                        >
                            Total Volume
                        </Text>
                        <Text
                            fontSize="20px"
                            fontWeight="semibold"
                            lineHeight="7"
                            color={gray12}
                            fontFamily="mono"
                            letterSpacing="tight"
                        >
                            $123,134.12
                        </Text>
                    </VStack>
                </HStack>
            </Flex>

            <Divider
                orientation="horizontal"
                borderStyle="dashed"
                borderColor={gray9}
                opacity="0.3"
                marginTop="10"
            />
        </Container>
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
            <NavigationBar />
            <Heading />
        </>
    );
};

export default Home;
