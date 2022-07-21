import {
    Container,
    Flex,
    Box,
    SimpleGrid,
    useColorModeValue,
    VStack,
    Text,
    Center,
    Button,
    Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";

import type {
    FuseLeveragedTokens,
    FuseLeveragedToken,
} from "../utils/fetchFuseLeveragedTokens";
import { FuseLeveragedTokenIcon } from "../FuseLeveragedTokenIcon";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TokenCardProps extends FuseLeveragedToken {}

// TODO(pyk): use two component TokenCardContainer to fetch latest price and so
// on and TokenCard for presentational only
const TokenCard = (props: TokenCardProps) => {
    // Data
    const { name, symbol } = props;

    // Styles
    const gray1 = useColorModeValue("gray.light.1", "gray.dark.1");
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Box
            bg="tomato"
            width="100%"
            minW="343px"
            background={gray1}
            border="1px"
            borderColor={gray3}
            borderRadius="3xl"
        >
            <Box paddingX="4" paddingY="5">
                <Flex>
                    <FuseLeveragedTokenIcon name={name} symbol={symbol} />
                    <Center paddingLeft="4">
                        <VStack flex="1" textAlign="left" spacing="1">
                            <Text
                                w="100%"
                                fontSize="sm"
                                fontWeight="bold"
                                lineHeight="4"
                                letterSpacing="tight"
                                color={gray12}
                            >
                                {symbol}
                            </Text>
                            <Text
                                w="100%"
                                fontSize="sm"
                                lineHeight="4"
                                letterSpacing="tight"
                                color={gray10}
                            >
                                {name}
                            </Text>
                        </VStack>
                    </Center>
                    <Spacer />
                    <NextLink href={`/trade/${symbol.toLowerCase()}`} passHref>
                        <Button as="a" data-testid="TokenCardOpen">
                            <Text>Open</Text>
                        </Button>
                    </NextLink>
                </Flex>
            </Box>
        </Box>
    );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TokenCardsProps extends FuseLeveragedTokens {}

export const TokenCards = (props: TokenCardsProps) => {
    const { tokens } = props;
    console.log("DEBUG: TokenCards tokens", tokens);
    const cards = tokens.map((token) => (
        <TokenCard {...token} key={token.address} />
    ));
    console.log("DEBUG: TokenCards: cards", cards);

    return (
        <Container maxW="7xl" py="3" data-testid="Heading">
            <SimpleGrid
                columns={{ base: "1", laptop: "2", desktop: "3" }}
                spacing="40px"
                margin="auto"
                maxW={{ base: "400px", laptop: "730px", desktop: "100%" }}
            >
                {cards}
            </SimpleGrid>
        </Container>
    );
};
