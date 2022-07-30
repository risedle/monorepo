import {
    VStack,
    Flex,
    Text,
    Divider,
    Box,
    useColorModeValue,
    Spacer,
    Skeleton,
    HStack,
} from "@chakra-ui/react";

// Utils
import formatTokenBalance from "@/utils/formatTokenBalance";
import formatUSD from "@/utils/formatUSD";

interface SwapCardQuoteProps {
    label: string;
    quoteAmount: number;
    quoteAmountUSD: number;
    quoteSymbol: string;
    isLoaded: boolean;
}

export const SwapCardQuote = (props: SwapCardQuoteProps) => {
    // Data
    const { label, quoteAmount, quoteAmountUSD, quoteSymbol, isLoaded } =
        props;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");

    return (
        <VStack
            data-testid="SwapCardQuote"
            margin="0 !important"
            width="100%"
            paddingX="4"
            background={gray2}
        >
            <Flex width="100%" alignItems="center">
                <Text fontSize="xs" lineHeight="4" color={gray10}>
                    {label}
                </Text>
                <Box flex="1" paddingLeft="2">
                    <Divider borderStyle="dashed" borderColor={gray5} />
                </Box>
            </Flex>
            <Flex width="100%" alignItems="center">
                <Skeleton
                    isLoaded={isLoaded}
                    startColor={gray3}
                    endColor={gray4}
                    borderRadius="lg"
                    minW="60px"
                >
                    <HStack gap={2}>
                        <Text
                            fontFamily="mono"
                            fontWeight="semibold"
                            fontSize="xl"
                            letterSpacing="tight"
                            lineHeight="6"
                        >
                            {formatTokenBalance(quoteAmount)}
                        </Text>
                        <Text
                            fontSize="md"
                            lineHeight="4"
                            letterSpacing="tight"
                            fontFamily="mono"
                            color={gray10}
                            margin="0 !important"
                        >
                            &asymp;{formatUSD(quoteAmountUSD)}
                        </Text>
                    </HStack>
                </Skeleton>
                <Spacer />
                <Text
                    fontSize="md"
                    lineHeight="4"
                    letterSpacing="tight"
                    fontFamily="mono"
                    color={gray10}
                >
                    {quoteSymbol}
                </Text>
            </Flex>
        </VStack>
    );
};

export default SwapCardQuote;
