import {
    HStack,
    VStack,
    Text,
    SimpleGrid,
    useColorModeValue,
    Center,
    Skeleton,
} from "@chakra-ui/react";

// Utils
import { formatUSD } from "@/utils/formatUSD";
import { formatPercent } from "@/utils/formatPercent";

// Sub-components
import ArrowDownIcon from "../Icons/ArrowDown";
import ArrowUpIcon from "../Icons/ArrowUp";

interface TokenCardInfoProps {
    price: number;
    priceChangePercent: number; // In percentage
    marketCap: number;
    isLoaded: boolean;
}

export const TokenCardInfo = (props: TokenCardInfoProps) => {
    // Data
    const { price, priceChangePercent, marketCap, isLoaded } = props;

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const red11 = useColorModeValue("red.light.11", "red.dark.11");
    const green11 = useColorModeValue("green.light.11", "green.dark.11");

    // Get price change
    const priceChangeIcon =
        priceChangePercent > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />;
    const priceChangeColor = priceChangePercent > 0 ? green11 : red11;

    return (
        <SimpleGrid columns={3} width="100%" padding="4" gap={2}>
            <VStack textAlign="left">
                <Text width="100%" color={gray10} fontSize="xs" lineHeight="4">
                    Price
                </Text>
                <Skeleton
                    width="100%"
                    startColor={gray3}
                    endColor={gray4}
                    borderRadius="lg"
                    isLoaded={isLoaded}
                >
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
                </Skeleton>
            </VStack>
            <VStack textAlign="left">
                <Text width="100%" color={gray10} fontSize="xs" lineHeight="4">
                    24h Changes
                </Text>
                <Skeleton
                    width="100%"
                    startColor={gray3}
                    endColor={gray4}
                    borderRadius="lg"
                    isLoaded={isLoaded}
                >
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
                                {formatPercent(priceChangePercent / 100)}
                            </Text>
                        </Center>
                    </HStack>
                </Skeleton>
            </VStack>
            <VStack textAlign="left">
                <Text width="100%" color={gray10} fontSize="xs" lineHeight="4">
                    Market Cap
                </Text>
                <Skeleton
                    width="100%"
                    startColor={gray3}
                    endColor={gray4}
                    borderRadius="lg"
                    isLoaded={isLoaded}
                >
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
                </Skeleton>
            </VStack>
        </SimpleGrid>
    );
};
