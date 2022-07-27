import {
    BoxProps,
    useColorModeValue,
    VStack,
    Text,
    Flex,
    HStack,
} from "@chakra-ui/react";

// Utils
import type { FuseLeveragedToken } from "../../utils/types";
import formatDate from "../../utils/formatDate";
import formatTokenBalance from "../../utils/formatTokenBalance";

// Sub-components
import InfoTooltip from "../InfoTooltip";
import { Dash } from "../../uikit/DashedComponent/DashedComponent";

interface LatestBackingsCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

export const LatestBackingsCard = (props: LatestBackingsCardProps) => {
    // Data
    const { flt, ...boxProps } = props;
    const {
        symbol,
        collateral,
        debt,
        backings,
        minLeverageRatio,
        maxLeverageRatio,
    } = flt;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");
    const green11 = useColorModeValue("green.light.11", "green.dark.11");
    const red11 = useColorModeValue("red.light.11", "red.dark.11");

    return (
        <VStack
            data-testid="LatestBackingsCard"
            alignItems="flex-start"
            background={gray2}
            borderRadius="2xl"
            gap={6}
            margin="0 !important"
            {...boxProps}
        >
            {/* Title */}
            <Text
                color={gray12}
                fontWeight="bold"
                fontSize="md"
                lineHeight="4"
                paddingX="4"
                paddingTop="4"
            >
                Latest backings
            </Text>

            {/* Description */}
            <Text
                color={gray10}
                fontSize="sm"
                lineHeight="6"
                paddingX="4"
                margin="0 !important"
            >
                Each {symbol} is backed by {collateral.symbol}/{debt.symbol}{" "}
                and can be redeemed to {collateral.symbol} or {debt.symbol} at
                anytime. The underlying assets will be rebalanced if leverage
                ratio below {minLeverageRatio}X or above {maxLeverageRatio}X
            </Text>

            {/* Table header */}
            <Flex
                width="100%"
                alignItems="flex-start"
                paddingX="2"
                margin="0 !important"
                data-testid="LatestBackingCardTable"
                paddingBottom="4"
            >
                <VStack flex="1" alignItems="flex-start" width="100%" gap={4}>
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
                        Date
                    </Text>
                    <VStack
                        divider={<Dash />}
                        margin="0 !important"
                        gap={4}
                        width="100%"
                        alignItems="flex-start"
                    >
                        {backings.map((backing) => (
                            <Text
                                color={gray12}
                                fontSize="sm"
                                lineHeight="4"
                                fontFamily="mono"
                                fontWeight="semibold"
                                paddingX="2"
                                margin="0 !important"
                                key={backing.timestamp}
                                data-testid="LatestBackingsCardDate"
                            >
                                {formatDate(backing.timestamp * 1000)}
                            </Text>
                        ))}
                    </VStack>
                </VStack>
                <VStack flex="1" alignItems="flex-start" width="100%" gap={4}>
                    <HStack width="100%" background={gray3}>
                        <Text
                            padding="2"
                            fontSize="xs"
                            lineHeight="4"
                            color={gray10}
                        >
                            {collateral.symbol}
                        </Text>
                        <InfoTooltip
                            info={`${collateral.symbol} used as collateral to borrow ${debt.symbol}`}
                            color={gray10}
                        />
                    </HStack>
                    <VStack
                        divider={<Dash />}
                        margin="0 !important"
                        gap={4}
                        width="100%"
                        alignItems="flex-start"
                    >
                        {backings.map((backing) => (
                            <Text
                                color={green11}
                                fontSize="sm"
                                lineHeight="4"
                                fontFamily="mono"
                                fontWeight="semibold"
                                paddingX="2"
                                margin="0 !important"
                                key={backing.timestamp}
                                data-testid="LatestBackingsCardCollateralAmount"
                            >
                                {formatTokenBalance(
                                    parseFloat(backing.collateralPerShare)
                                )}
                            </Text>
                        ))}
                    </VStack>
                </VStack>
                <VStack flex="1" alignItems="flex-start" width="100%" gap={4}>
                    <HStack
                        width="100%"
                        background={gray3}
                        borderTopRightRadius="lg"
                        borderBottomRightRadius="lg"
                    >
                        <Text
                            padding="2"
                            fontSize="xs"
                            lineHeight="4"
                            color={gray10}
                        >
                            {debt.symbol}
                        </Text>
                        <InfoTooltip
                            info={`Debt to buy more ${collateral.symbol}`}
                            color={gray10}
                        />
                    </HStack>
                    <VStack
                        divider={<Dash />}
                        margin="0 !important"
                        gap={4}
                        width="100%"
                        alignItems="flex-start"
                    >
                        {backings.map((backing) => (
                            <Text
                                color={red11}
                                fontSize="sm"
                                lineHeight="4"
                                fontFamily="mono"
                                fontWeight="semibold"
                                paddingX="2"
                                margin="0 !important"
                                key={backing.timestamp}
                                data-testid="LatestBackingsCardDebtAmount"
                            >
                                {formatTokenBalance(
                                    parseFloat(backing.debtPerShare)
                                )}
                            </Text>
                        ))}
                    </VStack>
                </VStack>
            </Flex>
        </VStack>
    );
};

export default LatestBackingsCard;
