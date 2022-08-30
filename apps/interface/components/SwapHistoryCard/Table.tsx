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
    useColorMode,
} from "@chakra-ui/react";
import TimeAgo from "react-timeago";
import NextImage from "next/image";

// Utils
import formatUSD from "@/utils/formatUSD";
import type { FuseLeveragedTokenSwap } from "@/utils/types";
import getTransactionExplorerURL from "@/utils/getTransactionExplorerURL";

// Icons
import ArrowTopRight from "@/components/Icons/ArrowTopRight";

interface SwapHistoryCardTableProps extends BoxProps {
    swaps: Array<FuseLeveragedTokenSwap>;
    isLoaded: boolean;
    symbol: string;
}

const TransactionData = ({
    swap,
    symbol,
}: {
    swap: FuseLeveragedTokenSwap;
    symbol: string;
}) => {
    const { colorMode } = useColorMode();
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const transactionType = swap.tokenIn.symbol === symbol ? "Sell" : "Buy";
    return (
        <HStack py="1">
            <NextImage
                src={`/icons/${transactionType.toLocaleUpperCase()}-${colorMode}.svg`}
                width="24px"
                height="24px"
                alt={`${transactionType} logo`}
            />
            <HStack>
                <Text
                    fontFamily="mono"
                    color={gray12}
                    fontSize="sm"
                    lineHeight="4"
                    data-testid="BackingCardCollateral"
                >
                    {swap.tokenIn.symbol === symbol
                        ? `${transactionType} ${swap.tokenIn.symbol} `
                        : `${transactionType} ${swap.tokenOut.symbol}`}
                </Text>
                <ArrowTopRight
                    w="14px"
                    h="14px"
                    margin="0 !important"
                    color={gray12}
                />
            </HStack>
        </HStack>
    );
};

export const SwapHistoryCardTable = (props: SwapHistoryCardTableProps) => {
    const { swaps, isLoaded, symbol, ...boxProps } = props;

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Flex
            margin="0 !important"
            data-testid="SwapHistoryCardTable"
            justifyContent="space-around"
            minH="180px"
            overflowX="scroll"
            {...boxProps}
        >
            {/* Transaction */}
            <VStack
                minWidth="200px"
                flex="1"
                gap="3"
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
                    gap="3"
                    width="100%"
                    alignItems="flex-start"
                >
                    {swaps.map((swap, index) => (
                        <Skeleton
                            isLoaded={isLoaded}
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            px="2"
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
                                <TransactionData swap={swap} symbol={symbol} />
                            </Link>
                        </Skeleton>
                    ))}
                </VStack>
            </VStack>

            {/* Account */}
            <VStack minWidth="120px" gap="3" data-testid="TableAccount">
                <Text
                    padding="2"
                    background={gray4}
                    width="120px"
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
                    gap="3"
                    width="100%"
                    alignItems="flex-start"
                >
                    {swaps.map((swap, index) => (
                        <Skeleton
                            isLoaded={isLoaded}
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            px="2"
                            minW="60px"
                            data-testid="SwapHistoryCardTableTime"
                            key={`${swap.timestamp} ${index}`}
                        >
                            <Flex alignItems="center" py="2">
                                <Text
                                    fontFamily="mono"
                                    color={gray10}
                                    fontSize="sm"
                                    lineHeight="4"
                                    margin="0 !important"
                                >
                                    <TimeAgo
                                        date={parseInt(swap.timestamp) * 1000}
                                    />
                                </Text>
                            </Flex>
                        </Skeleton>
                    ))}
                </VStack>
            </VStack>

            {/* Total value */}
            <VStack
                minWidth="120px"
                alignItems="flex-end"
                gap="3"
                data-testid="TableTotalValue"
                width="120px"
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
                    gap="3"
                    width="120px"
                    alignItems="flex-end"
                >
                    {swaps.map((swap, index) => (
                        <Skeleton
                            isLoaded={isLoaded}
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            px="2"
                            width="120px"
                            data-testid="SwapHistoryCardTableTotalValue"
                            key={`${swap.timestamp} ${index}`}
                        >
                            <Flex alignItems="center" py="2">
                                <Text
                                    color={gray12}
                                    fontSize="sm"
                                    lineHeight="4"
                                    fontFamily="mono"
                                    letterSpacing="tight"
                                >
                                    {formatUSD(parseFloat(swap.amountInUSD))}
                                </Text>
                            </Flex>
                        </Skeleton>
                    ))}
                </VStack>
            </VStack>
        </Flex>
    );
};

export default SwapHistoryCardTable;
