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
import FuseLeveragedTokenInfoCardDescription from "./Description";

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
            <FuseLeveragedTokenInfoCardDescription
                symbol={symbol}
                name={name}
            />

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
