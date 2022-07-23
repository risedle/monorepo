import {
    Box,
    Flex,
    Center,
    VStack,
    Text,
    Spacer,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";

import FuseLeveragedTokenIcon from "../Icons/FuseLeveragedToken";

interface TokenCardTitleProps {
    name: string;
    symbol: string;
}

export const TokenCardTitle = (props: TokenCardTitleProps) => {
    // Data
    const { name, symbol } = props;

    // Styles
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Box paddingX="4" paddingY="5" w="100%">
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
    );
};
