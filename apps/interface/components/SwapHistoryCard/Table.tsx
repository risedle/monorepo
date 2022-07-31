import {
    BoxProps,
    Flex,
    VStack,
    Text,
    HStack,
    StackDivider,
    useColorModeValue,
    Link,
    Skeleton,
} from "@chakra-ui/react";
import TimeAgo from "react-timeago";

// Utils
import formatUSD from "@/utils/formatUSD";
import type { FuseLeveragedTokenSwap } from "@/utils/types";
import getTransactionExplorerURL from "@/utils/getTransactionExplorerURL";

// Icons
import ArrowTopRight from "@/components/Icons/ArrowTopRight";

interface SwapHistoryCardTableProps extends BoxProps {
    swaps: Array<FuseLeveragedTokenSwap>;
    isLoaded: boolean;
}

export const SwapHistoryCardTable = (props: SwapHistoryCardTableProps) => {
    const { swaps, isLoaded, ...boxProps } = props;

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Flex
            width="100%"
            alignItems="flex-start"
            margin="0 !important"
            data-testid="SwapHistoryCardTable"
            minH="200px"
            {...boxProps}
        >
            {/* Transaction */}
            <VStack
                flex="1"
                alignItems="flex-start"
                width="100%"
                gap={4}
                data-testid="TableTransaction"
            >
                <Text
                    padding="2"
                    background={gray4}
                    width="100%"
                    borderTopLeftRadius="lg"
                    borderBottomLeftRadius="lg"
                    fontSize="xs"
                    lineHeight="4"
                    color={gray10}
                >
                    Transaction
                </Text>
                <VStack
                    divider={
                        <StackDivider
                            borderColor={gray5}
                            borderStyle="dashed"
                            margin="0 !important"
                        />
                    }
                    margin="0 !important"
                    gap={4}
                    width="100%"
                    alignItems="flex-start"
                >
                    {swaps.map((swap, index) => (
                        <Skeleton
                            isLoaded={isLoaded}
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            marginX="2"
                            minW="60px"
                            key={`${swap.timestamp} ${index}`}
                        >
                            <Link
                                _hover={{ textDecoration: "none" }}
                                href={getTransactionExplorerURL(
                                    swap.transaction.id
                                )}
                                target="_blank"
                                data-testid="SwapHistoryCardTableTransactionLink"
                            >
                                <HStack>
                                    <Text
                                        color={gray12}
                                        fontSize="sm"
                                        lineHeight="4"
                                        margin="0 !important"
                                        data-testid="BackingCardCollateral"
                                    >
                                        Swap {swap.tokenIn.symbol} for{" "}
                                        {swap.tokenOut.symbol}
                                    </Text>
                                    <ArrowTopRight
                                        w="14px"
                                        h="14px"
                                        margin="0 !important"
                                        color={gray10}
                                    />
                                </HStack>
                            </Link>
                        </Skeleton>
                    ))}
                </VStack>
            </VStack>

            {/* Account */}
            <VStack gap={4} data-testid="TableAccount">
                <Text
                    padding="2"
                    background={gray4}
                    width="100%"
                    fontSize="xs"
                    lineHeight="4"
                    color={gray10}
                >
                    Time
                </Text>
                <VStack
                    divider={
                        <StackDivider
                            borderColor={gray5}
                            borderStyle="dashed"
                            margin="0 !important"
                        />
                    }
                    margin="0 !important"
                    gap={4}
                    width="100%"
                    alignItems="flex-start"
                >
                    {swaps.map((swap, index) => (
                        <Skeleton
                            isLoaded={isLoaded}
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            marginX="2"
                            minW="60px"
                            data-testid="SwapHistoryCardTableTime"
                            key={`${swap.timestamp} ${index}`}
                        >
                            <Text
                                color={gray12}
                                fontSize="sm"
                                lineHeight="4"
                                margin="0 !important"
                            >
                                <TimeAgo
                                    date={parseInt(swap.timestamp) * 1000}
                                />
                            </Text>
                        </Skeleton>
                    ))}
                </VStack>
            </VStack>

            {/* Total value */}
            <VStack
                alignItems="flex-end"
                gap={4}
                data-testid="TableTotalValue"
                minW="100px"
            >
                <Text
                    padding="2"
                    background={gray4}
                    width="100%"
                    fontSize="xs"
                    lineHeight="4"
                    color={gray10}
                    borderTopRightRadius="lg"
                    borderBottomRightRadius="lg"
                    textAlign="right"
                >
                    Total value
                </Text>
                <VStack
                    divider={
                        <StackDivider
                            borderColor={gray5}
                            borderStyle="dashed"
                            margin="0 !important"
                        />
                    }
                    margin="0 !important"
                    gap={4}
                    width="100%"
                    alignItems="flex-end"
                >
                    {swaps.map((swap, index) => (
                        <Skeleton
                            isLoaded={isLoaded}
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            marginX="2"
                            minW="60px"
                            data-testid="SwapHistoryCardTableTotalValue"
                            key={`${swap.timestamp} ${index}`}
                        >
                            <Text
                                color={gray12}
                                fontSize="sm"
                                lineHeight="4"
                                fontFamily="mono"
                                letterSpacing="tight"
                            >
                                {formatUSD(parseFloat(swap.amountInUSD))}
                            </Text>
                        </Skeleton>
                    ))}
                </VStack>
            </VStack>
        </Flex>
    );
};

export default SwapHistoryCardTable;
