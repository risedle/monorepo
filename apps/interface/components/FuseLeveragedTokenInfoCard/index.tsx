import {
    BoxProps,
    VStack,
    Text,
    useColorModeValue,
    Divider,
} from "@chakra-ui/react";

// Utils
import type { FuseLeveragedToken } from "@/utils/types";

// Sub-components
import FuseLeveragedTokenInfoCardStatsContainer from "./StatsContainer";

interface FuseLeveragedTokenInfoCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

export const FuseLeveragedTokenInfoCard = (
    props: FuseLeveragedTokenInfoCardProps
) => {
    // Data
    const { flt, ...boxProps } = props;
    const { name, symbol, address, collateral, debt } = flt;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack
            data-testid="FuseLeveragedTokenInfoCard"
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
                Overview
            </Text>

            {/* Description */}
            <VStack margin="0 !important" paddingX="4" gap={6}>
                <Text color={gray10} fontSize="sm" lineHeight="6">
                    {symbol} ({name}) is a derivatives product with no margin
                    or liquidation risks. It provides you with leveraged
                    exposure to the underlying asset, which may amplify
                    profitability and potential losses. {symbol} is backed by
                    real assets and can be redeemed at anytime.
                </Text>
                <Text
                    color={gray10}
                    fontSize="sm"
                    lineHeight="6"
                    margin="0 !important"
                >
                    Due to the rebalancing mechanism, the {symbol} are more
                    suitable for short-term investment in a one-sided market.
                    In a volatile market, the actual leverage may frequently
                    exceed the target leverage range. This means that the
                    rebalancing mechanism will be triggered accordingly in
                    order to maintain leverage within the target range. Thus,{" "}
                    {symbol} are not suitable for long-term investments.
                </Text>
            </VStack>

            {/* Divider */}
            <Divider
                borderStyle="dashed"
                borderColor={gray5}
                margin="0 !important"
            />

            {/* Stats */}
            <FuseLeveragedTokenInfoCardStatsContainer
                paddingX="4"
                paddingBottom="4"
                symbol={symbol}
                collateralSymbol={collateral.symbol}
                debtSymbol={debt.symbol}
                address={address}
            />
        </VStack>
    );
};
