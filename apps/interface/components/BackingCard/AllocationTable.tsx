import {
    BoxProps,
    HStack,
    useColorModeValue,
    Text,
    Skeleton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
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

const BackingCardAllocationTable = (
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
        <TableContainer
            mt="0px !important"
            w="100%"
            {...boxProps}
            data-testid="BackingCardAllocationTable"
        >
            <Table mt="-16px !important" variant="simple">
                <Thead>
                    <Tr>
                        <Td
                            border="none"
                            pb="0px !important"
                            px="0"
                            data-testid="AllocationTableAsset"
                        >
                            <Text
                                background={gray4}
                                padding="2"
                                width="100%"
                                borderTopLeftRadius="lg"
                                borderBottomLeftRadius="lg"
                                fontSize="xs"
                                lineHeight="4"
                                color={gray10}
                                fontWeight="500"
                            >
                                Asset
                            </Text>
                        </Td>
                        <Td
                            pb="0px !important"
                            border="none"
                            isNumeric
                            px="0"
                            data-testid="AllocationTableAmount"
                        >
                            <Text
                                background={gray4}
                                padding="2"
                                fontSize="xs"
                                lineHeight="4"
                                color={gray10}
                                width="100%"
                                textAlign="right"
                                fontFamily="sans-serif"
                                fontWeight="500"
                            >
                                Allocation
                            </Text>
                        </Td>
                        <Td
                            pb="0px !important"
                            border="none"
                            px="0"
                            data-testid="AllocationTableChange"
                        >
                            <Text
                                fontFamily="sans-serif"
                                background={gray4}
                                padding="2"
                                width="100%"
                                fontSize="xs"
                                lineHeight="4"
                                fontWeight="500"
                                color={gray10}
                                borderTopRightRadius="lg"
                                borderBottomRightRadius="lg"
                                textAlign="right"
                            >
                                24h Change
                            </Text>
                        </Td>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td borderColor={gray5} borderStyle="dashed" px="0">
                            <HStack w="100%">
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
                                    info={`${debtSymbol} is swapped to ${collateralSymbol}`}
                                    color={gray10}
                                />
                            </HStack>
                        </Td>
                        <Td
                            borderColor={gray5}
                            borderStyle="dashed"
                            isNumeric
                            pr="0px"
                        >
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
                        </Td>
                        <Td
                            borderColor={gray5}
                            borderStyle="dashed"
                            isNumeric
                            px="2"
                        >
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
                                        {formatPercent(
                                            collateralChangePercent / 100
                                        )}
                                    </Text>
                                </HStack>
                            </Skeleton>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td
                            borderColor={gray5}
                            borderStyle="dashed"
                            w="100%"
                            px="0"
                        >
                            <HStack w="100%">
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
                        </Td>
                        <Td
                            pr="0px"
                            borderColor={gray5}
                            borderStyle="dashed"
                            isNumeric
                            px="2"
                        >
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
                        </Td>
                        <Td
                            borderColor={gray5}
                            borderStyle="dashed"
                            isNumeric
                            px="2"
                        >
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
                                        {formatPercent(
                                            debtChangePercent / 100
                                        )}
                                    </Text>
                                </HStack>
                            </Skeleton>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default BackingCardAllocationTable;
