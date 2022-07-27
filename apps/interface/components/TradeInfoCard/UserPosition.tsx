import {
    VStack,
    HStack,
    Text,
    Flex,
    BoxProps,
    Circle,
    Skeleton,
    useColorModeValue,
    Center,
} from "@chakra-ui/react";

import { getBaseConfig } from "../../utils/getBaseConfig";
import formatTokenBalance from "../../utils/formatTokenBalance";
import formatUSD from "../../utils/formatUSD";

import PieIcon from "../Icons/Pie";
import CoinIcon from "../Icons/Coin";
import MetricIcon from "../Icons/Metric";
import DollarIcon from "../Icons/Dollar";
import ArrowUpIcon from "../Icons/ArrowUp";
import ArrowDownIcon from "../Icons/ArrowDown";

import InfoTooltip from "../InfoTooltip";

interface TradeInfoCardUserPositionProps extends BoxProps {
    balance: number;
    valueUSD: number;
    pnlPercent: number;
    pnlUSD: number;
    isLoaded: boolean;
}

export const TradeInfoCardUserPosition = (
    props: TradeInfoCardUserPositionProps
) => {
    const { balance, valueUSD, pnlPercent, pnlUSD, isLoaded, ...boxProps } =
        props;
    const { chainSlug } = getBaseConfig();

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const accent = useColorModeValue(
        `${chainSlug}.button.bg.light`,
        `${chainSlug}.button.bg.dark`
    );
    const red11 = useColorModeValue("red.light.11", "red.dark.11");
    const green11 = useColorModeValue("green.light.11", "green.dark.11");

    // Get Profit & Loss styles
    const pnlIcon = pnlPercent >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />;
    const pnlColor = pnlPercent >= 0 ? green11 : red11;

    return (
        <VStack
            data-testid="TradeInfoCardUserPosition"
            width="100%"
            gap={{ base: "4", tablet: "0" }}
            {...boxProps}
            margin="0 !important"
        >
            <Flex
                width="100%"
                borderY={{ base: "none", tablet: "1px" }}
                borderColor={{ tablet: gray5 }}
                borderStyle={{ tablet: "dashed" }}
            >
                <HStack
                    gap="3"
                    flex="1"
                    py={{ base: "0", tablet: "4" }}
                    borderRight={{ base: "none", tablet: "1px" }}
                    borderColor={{ tablet: gray5 }}
                    borderStyle={{ tablet: "dashed" }}
                >
                    <Circle size="8" background={gray3}>
                        <PieIcon color={accent} />
                    </Circle>
                    <VStack
                        alignItems="flex-start"
                        gap="1"
                        margin="0 !important"
                    >
                        <HStack gap={1}>
                            <Text fontSize="sm" lineHeight="4" color={gray10}>
                                Balance
                            </Text>
                            <InfoTooltip
                                info="Updated every 5 minutes"
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
                            <Text
                                fontFamily="mono"
                                fontSize="sm"
                                lineHeight="4"
                                fontWeight="semibold"
                                letterSpacing="tight"
                                margin="0 !important"
                            >
                                {formatTokenBalance(balance)}
                            </Text>
                        </Skeleton>
                    </VStack>
                </HStack>
                <HStack
                    gap="3"
                    flex="1"
                    py={{ base: "0", tablet: "4" }}
                    ml={{ base: "0", tablet: "4" }}
                >
                    <Circle size="8" background={gray3}>
                        <CoinIcon color={accent} />
                    </Circle>
                    <VStack
                        alignItems="flex-start"
                        gap="1"
                        margin="0 !important"
                    >
                        <Text fontSize="sm" lineHeight="4" color={gray10}>
                            Balance value
                        </Text>
                        <Skeleton
                            width="100%"
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            isLoaded={isLoaded}
                            margin="0 !important"
                        >
                            <Text
                                fontFamily="mono"
                                fontSize="sm"
                                lineHeight="4"
                                fontWeight="semibold"
                                letterSpacing="tight"
                                margin="0 !important"
                            >
                                {formatUSD(valueUSD)}
                            </Text>
                        </Skeleton>
                    </VStack>
                </HStack>
            </Flex>
            <Flex width="100%" margin="0 !important">
                <HStack
                    gap="3"
                    flex="1"
                    py={{ base: "0", tablet: "4" }}
                    borderRight={{ base: "none", tablet: "1px" }}
                    borderColor={{ tablet: gray5 }}
                    borderStyle={{ tablet: "dashed" }}
                >
                    <Circle size="8" background={gray3}>
                        <MetricIcon color={accent} />
                    </Circle>
                    <VStack
                        alignItems="flex-start"
                        gap="1"
                        margin="0 !important"
                    >
                        <HStack gap={1}>
                            <Text fontSize="sm" lineHeight="4" color={gray10}>
                                Open P/L
                            </Text>
                            <InfoTooltip
                                info="Based on your average buy price"
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
                            <HStack width="100%" color={pnlColor} spacing="1">
                                <Center>{pnlIcon}</Center>
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
                                        {pnlPercent >= 0 ? "+" : ""}
                                        {pnlPercent.toFixed(2)}%
                                    </Text>
                                </Center>
                            </HStack>
                        </Skeleton>
                    </VStack>
                </HStack>
                <HStack
                    gap="3"
                    flex="1"
                    py={{ base: "0", tablet: "4" }}
                    ml={{ base: "0", tablet: "4" }}
                >
                    <Circle size="8" background={gray3}>
                        <DollarIcon color={accent} />
                    </Circle>
                    <VStack
                        alignItems="flex-start"
                        gap="1"
                        margin="0 !important"
                    >
                        <Text fontSize="sm" lineHeight="4" color={gray10}>
                            Open P/L value
                        </Text>
                        <Skeleton
                            width="100%"
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            isLoaded={isLoaded}
                            margin="0 !important"
                        >
                            <HStack width="100%" color={pnlColor} spacing="1">
                                <Center>{pnlIcon}</Center>
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
                                        {pnlUSD >= 0 ? "+" : ""}
                                        {formatUSD(pnlUSD)}
                                    </Text>
                                </Center>
                            </HStack>
                        </Skeleton>
                    </VStack>
                </HStack>
            </Flex>
        </VStack>
    );
};

export default TradeInfoCardUserPosition;
