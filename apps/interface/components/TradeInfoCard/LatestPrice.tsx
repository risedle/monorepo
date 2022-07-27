import {
    VStack,
    HStack,
    Text,
    Skeleton,
    useColorModeValue,
    Center,
    BoxProps,
} from "@chakra-ui/react";

// Utils
import { formatUSD } from "../../utils/formatUSD";
import formatPercent from "../../utils/formatPercent";

// Sub-components
import ArrowDownIcon from "../Icons/ArrowDown";
import ArrowUpIcon from "../Icons/ArrowUp";
import InfoTooltip from "../InfoTooltip";

interface TradeInfoCardLatestPriceProps extends BoxProps {
    price: number;
    priceChangeUSD: number;
    priceChangePercent: number;
    isLoaded?: boolean;
}

export const TradeInfoCardLatestPrice = (
    props: TradeInfoCardLatestPriceProps
) => {
    // Data
    const {
        price,
        priceChangeUSD,
        priceChangePercent,
        isLoaded,
        ...boxProps
    } = props;

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
        <HStack
            data-testid="TradeInfoCardLatestPrice"
            width="100%"
            gap="4"
            margin="0 !important"
            {...boxProps}
        >
            <VStack alignItems="flex-start" gap="2" minW="80px">
                <HStack gap={1}>
                    <Text fontSize="sm" lineHeight="4" color={gray10}>
                        Price
                    </Text>
                    <InfoTooltip info="Latest on-chain price" color={gray10} />
                </HStack>
                <Skeleton
                    width="100%"
                    startColor={gray3}
                    endColor={gray4}
                    borderRadius="lg"
                    isLoaded={isLoaded}
                    margin="0 !important"
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
            <VStack alignItems="flex-start" gap="2">
                <HStack gap={1}>
                    <Text fontSize="sm" lineHeight="4" color={gray10}>
                        24h Price Change
                    </Text>
                    <InfoTooltip
                        info="Based on yesterday open price"
                        color={gray10}
                    />
                </HStack>
                <Skeleton
                    width="100%"
                    startColor={gray3}
                    endColor={gray4}
                    borderRadius="lg"
                    isLoaded={isLoaded}
                    margin="0 !important"
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
                                {priceChangePercent > 0 ? "+" : ""}
                                {formatUSD(priceChangeUSD)} (
                                {formatPercent(priceChangePercent / 100)})
                            </Text>
                        </Center>
                    </HStack>
                </Skeleton>
            </VStack>
        </HStack>
    );
};

export default TradeInfoCardLatestPrice;
