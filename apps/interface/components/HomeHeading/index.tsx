import {
    Container,
    Flex,
    Spacer,
    HStack,
    VStack,
    Text,
    useColorModeValue,
    Divider,
} from "@chakra-ui/react";

import { formatUSD } from "../../utils/formatUSD";

interface HomeHeadingProps {
    totalMarketCap: number;
    totalVolume: number;
}

export const HomeHeading = (props: HomeHeadingProps) => {
    // Data
    const { totalMarketCap, totalVolume } = props;

    // Styles
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
                    fontSize={{ base: "24px", tablet: "32px" }}
                    lineHeight="32px"
                    letterSpacing="tight"
                    color={gray12}
                    marginTop="auto" // align vertical bottom
                    textAlign={{ base: "center", tablet: "left" }}
                    marginBottom={{ base: "6", tablet: "0" }}
                >
                    Trade Leveraged Tokens
                </Text>
                <Spacer />
                <HStack spacing="6" margin={{ base: "auto", tablet: 0 }}>
                    <VStack
                        spacing="2"
                        minW="100px"
                        textAlign={{ base: "center", tablet: "right" }}
                    >
                        <Text
                            fontSize="xs"
                            lineHeight="4"
                            color={gray10}
                            w="100%"
                        >
                            Total Market Cap
                        </Text>
                        <Text
                            fontSize={{ base: "sm", tablet: "20px" }}
                            fontWeight="semibold"
                            lineHeight={{ base: "4", tablet: "7" }}
                            color={gray12}
                            fontFamily="mono"
                            letterSpacing="tight"
                            w="100%"
                        >
                            {formatUSD(totalMarketCap)}
                        </Text>
                    </VStack>
                    <VStack
                        spacing="2"
                        minW="100px"
                        textAlign={{ base: "center", tablet: "right" }}
                    >
                        <Text
                            fontSize="xs"
                            lineHeight="4"
                            color={gray10}
                            w="100%"
                        >
                            Total Volume
                        </Text>
                        <Text
                            fontSize={{ base: "sm", tablet: "20px" }}
                            fontWeight="semibold"
                            lineHeight={{ base: "4", tablet: "7" }}
                            color={gray12}
                            fontFamily="mono"
                            letterSpacing="tight"
                            w="100%"
                        >
                            {formatUSD(totalVolume)}
                        </Text>
                    </VStack>
                </HStack>
            </Flex>

            <Divider
                orientation="horizontal"
                borderStyle="dashed"
                borderColor={gray9}
                opacity="0.3"
                marginTop={{ base: "7", tablet: "10" }}
                marginBottom={{ base: "7", tablet: "10" }}
            />
        </Container>
    );
};
