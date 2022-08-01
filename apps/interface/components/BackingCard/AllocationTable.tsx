import {
    BoxProps,
    Flex,
    VStack,
    HStack,
    useColorModeValue,
    StackDivider,
    Text,
    Skeleton,
} from "@chakra-ui/react";

// Utils
import formatTokenBalance from "@/utils/formatTokenBalance";
import formatPercent from "@/utils/formatPercent";

// Sub-components
import InfoTooltip from "@/components/InfoTooltip";
import ArrowUpIcon from "@/components/Icons/ArrowUp";
import ArrowDownIcon from "@/components/Icons/ArrowDown";

interface BackingCardAllocationTableProps extends BoxProps {
    collateralSymbol: string;
    debtSymbol: string;
    collateralAmount: number;
    debtAmount: number;
    collateralChangePercent: number;
    debtChangePercent: number;
    isLoaded: boolean;
}

export const BackingCardAllocationTable = (
    props: BackingCardAllocationTableProps
) => {
    // Data
    const {
        collateralSymbol,
        debtSymbol,
        collateralAmount,
        debtAmount,
        collateralChangePercent,
        debtChangePercent,
        isLoaded,
        ...boxProps
    } = props;

    // Styles
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const red11 = useColorModeValue("red.light.11", "red.dark.11");
    const green11 = useColorModeValue("green.light.11", "green.dark.11");

    // Get backing change
    const collateralChangeIcon =
        collateralChangePercent >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />;
    const collateralChangeColor =
        collateralChangePercent >= 0 ? green11 : red11;
    const debtChangeIcon =
        debtChangePercent >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />;
    const debtChangeColor = debtChangePercent >= 0 ? green11 : red11;

    return (
        <Flex
            width="100%"
            alignItems="flex-start"
            margin="0 !important"
            data-testid="BackingCardAllocationTable"
            {...boxProps}
        >
            {/* Asset */}
            <VStack
                flex="1"
                alignItems="flex-start"
                width="100%"
                gap={4}
                data-testid="AllocationTableAsset"
            >
                <Text
                    padding="2"
                    background={gray3}
                    width="100%"
                    borderTopLeftRadius="lg"
                    borderBottomLeftRadius="lg"
                    fontSize="xs"
                    lineHeight="4"
                    color={gray10}
                >
                    Asset
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
                    <HStack width="100%">
                        <Text
                            color={gray12}
                            fontSize="sm"
                            lineHeight="4"
                            fontFamily="mono"
                            fontWeight="semibold"
                            paddingX="2"
                            margin="0 !important"
                            letterSpacing="tight"
                            data-testid="BackingCardCollateral"
                        >
                            {collateralSymbol}
                        </Text>
                        <InfoTooltip
                            info={`${collateralSymbol} used as collateral to borrow ${debtSymbol}`}
                            color={gray10}
                        />
                    </HStack>
                    <HStack width="100%">
                        <Text
                            color={gray12}
                            fontSize="sm"
                            lineHeight="4"
                            fontFamily="mono"
                            fontWeight="semibold"
                            paddingX="2"
                            margin="0 !important"
                            letterSpacing="tight"
                            data-testid="BackingCardDebt"
                        >
                            {debtSymbol}
                        </Text>
                        <InfoTooltip
                            info={`${debtSymbol} is swapped to ${collateralSymbol}`}
                            color={gray10}
                        />
                    </HStack>
                </VStack>
            </VStack>

            {/* Allocation */}
            <VStack
                alignItems="flex-end"
                gap={4}
                data-testid="AllocationTableAmount"
            >
                <Text
                    padding="2"
                    background={gray3}
                    fontSize="xs"
                    lineHeight="4"
                    color={gray10}
                    width="100%"
                    textAlign="right"
                >
                    Allocation
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
                    {/* Collateral amount */}
                    <Skeleton
                        isLoaded={isLoaded}
                        startColor={gray3}
                        endColor={gray4}
                        borderRadius="lg"
                        marginX="2"
                        minW="60px"
                    >
                        <Text
                            color={gray12}
                            fontSize="sm"
                            lineHeight="4"
                            fontFamily="mono"
                            fontWeight="semibold"
                            letterSpacing="tight"
                            data-testid="AllocationTableCollateralAmount"
                        >
                            +{formatTokenBalance(collateralAmount)}
                        </Text>
                    </Skeleton>

                    {/* Debt amount */}
                    <Skeleton
                        isLoaded={isLoaded}
                        startColor={gray3}
                        endColor={gray4}
                        borderRadius="lg"
                        marginX="2"
                        minW="60px"
                    >
                        <Text
                            color={gray12}
                            fontSize="sm"
                            lineHeight="4"
                            fontFamily="mono"
                            fontWeight="semibold"
                            letterSpacing="tight"
                            data-testid="AllocationTableDebtAmount"
                        >
                            -{formatTokenBalance(debtAmount)}
                        </Text>
                    </Skeleton>
                </VStack>
            </VStack>

            {/* Changes */}
            <VStack
                alignItems="flex-end"
                gap={4}
                data-testid="AllocationTableChange"
                minW="100px"
            >
                <Text
                    padding="2"
                    background={gray3}
                    width="100%"
                    fontSize="xs"
                    lineHeight="4"
                    color={gray10}
                    borderTopRightRadius="lg"
                    borderBottomRightRadius="lg"
                    textAlign="right"
                >
                    24h Change
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
                >
                    {/* Collateral changes */}
                    <Skeleton
                        isLoaded={isLoaded}
                        startColor={gray3}
                        endColor={gray4}
                        borderRadius="lg"
                        marginX="2"
                        minW="60px"
                    >
                        <HStack
                            color={collateralChangeColor}
                            spacing="1"
                            justifyContent="flex-end"
                        >
                            {collateralChangeIcon}
                            <Text
                                fontSize="sm"
                                fontWeight="semibold"
                                lineHeight="4"
                                letterSpacing="tight"
                                fontFamily="mono"
                            >
                                {formatPercent(collateralChangePercent / 100)}
                            </Text>
                        </HStack>
                    </Skeleton>

                    {/* Debt change */}
                    <Skeleton
                        isLoaded={isLoaded}
                        startColor={gray3}
                        endColor={gray4}
                        borderRadius="lg"
                        marginX="2"
                        minW="60px"
                    >
                        <HStack
                            color={debtChangeColor}
                            spacing="1"
                            justifyContent="flex-end"
                        >
                            {debtChangeIcon}
                            <Text
                                fontSize="sm"
                                fontWeight="semibold"
                                lineHeight="4"
                                letterSpacing="tight"
                                fontFamily="mono"
                            >
                                {formatPercent(debtChangePercent / 100)}
                            </Text>
                        </HStack>
                    </Skeleton>
                </VStack>
            </VStack>
        </Flex>
    );
};

export default BackingCardAllocationTable;
