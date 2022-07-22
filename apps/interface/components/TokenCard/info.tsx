import {
    HStack,
    VStack,
    Text,
    SimpleGrid,
    useColorModeValue,
    Icon,
    IconProps,
    Center,
} from "@chakra-ui/react";

import { formatUSD } from "../../utils/formatUSD";

import { PriceDownIcon } from "../PriceDownIcon";
import { PriceUpIcon } from "../PriceUpIcon";

interface TokenCardInfoProps {
    price: number;
    priceChangePercent: number; // In percentage
    marketCap: number;
}

export const TokenCardInfo = (props: TokenCardInfoProps) => {
    // Data
    const { price, priceChangePercent, marketCap } = props;

    // Styles
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const red11 = useColorModeValue("red.light.11", "red.dark.11");
    const green11 = useColorModeValue("green.light.11", "green.dark.11");

    // Get price change
    const priceChangeIcon =
        priceChangePercent > 0 ? <PriceUpIcon /> : <PriceDownIcon />;
    const priceChangeColor = priceChangePercent > 0 ? green11 : red11;

    return (
        <SimpleGrid columns={3} width="100%" padding="4">
            <VStack textAlign="left">
                <Text width="100%" color={gray10} fontSize="xs" lineHeight="4">
                    Price
                </Text>
                <Text
                    width="100%"
                    fontSize="sm"
                    fontWeight="semibold"
                    lineHeight="4"
                    letterSpacing="tight"
                    fontFamily="mono"
                    color={gray12}
                >
                    {formatUSD(price)}
                </Text>
            </VStack>
            <VStack textAlign="left">
                <Text width="100%" color={gray10} fontSize="xs" lineHeight="4">
                    24h Changes
                </Text>
                <HStack width="100%" color={priceChangeColor} spacing="1">
                    <Center>{priceChangeIcon}</Center>
                    <Center>
                        <Text
                            width="100%"
                            fontSize="sm"
                            fontWeight="semibold"
                            lineHeight="4"
                            letterSpacing="tight"
                            fontFamily="mono"
                            margin="0 !important"
                        >
                            {priceChangePercent}%
                        </Text>
                    </Center>
                </HStack>
            </VStack>
            <VStack textAlign="left">
                <Text width="100%" color={gray10} fontSize="xs" lineHeight="4">
                    Market Cap
                </Text>
                <Text
                    width="100%"
                    fontSize="sm"
                    fontWeight="semibold"
                    lineHeight="4"
                    letterSpacing="tight"
                    fontFamily="mono"
                >
                    {formatUSD(marketCap)}
                </Text>
            </VStack>
        </SimpleGrid>
    );
};
