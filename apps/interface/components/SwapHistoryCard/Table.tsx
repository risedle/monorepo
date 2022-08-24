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
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const transactionType = swap.tokenIn.symbol === symbol ? "Sell" : "Buy";
    return (
        <HStack alignItems={"center"} height="48px">
            <NextImage
                src={`/icons/${transactionType.toLocaleUpperCase()}-${colorMode}.svg`}
                width="48px"
                height="48px"
                alt={`${transactionType} logo`}
            />
            <Text
                fontFamily="mono"
                color={gray12}
                fontSize="sm"
                lineHeight="4"
                margin="0 !important"
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
                color={gray10}
            />
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
            minH="180px"
            overflowX={"scroll"}
            {...boxProps}
        >
            {/* Transaction */}
            <VStack
                minW="180px"
                flex="1"
                alignItems="flex-start"
                gap={4}
                data-testid="TableTransaction"
            >
                <Text
                    fontFamily="mono"
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
                                <TransactionData swap={swap} symbol={symbol} />
                            </Link>
                        </Skeleton>
                    ))}
                </VStack>
            </VStack>

            {/* Account */}
            <VStack width={"120px"} gap={4} data-testid="TableAccount">
                <Text
                    fontFamily="mono"
                    padding="2"
                    background={gray4}
                    width={"120px"}
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
                            <Flex minH={"48px"} alignItems={"center"}>
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
                alignItems="flex-end"
                gap={4}
                data-testid="TableTotalValue"
                width={"120px"}
            >
                <Text
                    fontFamily="mono"
                    padding="2"
                    paddingLeft="1px"
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
                    gap={4}
                    width={"120px"}
                    alignItems="flex-end"
                >
                    {swaps.map((swap, index) => (
                        <Skeleton
                            isLoaded={isLoaded}
                            startColor={gray3}
                            endColor={gray4}
                            borderRadius="lg"
                            width={"120px"}
                            data-testid="SwapHistoryCardTableTotalValue"
                            key={`${swap.timestamp} ${index}`}
                        >
                            <Flex minH={"48px"} alignItems={"center"}>
                                <Text
                                    paddingLeft="2"
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
