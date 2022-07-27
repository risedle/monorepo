import { BoxProps, VStack, Text, useColorModeValue } from "@chakra-ui/react";

// Utils
import type { FuseLeveragedToken } from "../../utils/types";

// Sub-components
import BackingCardAllocationTableContainer from "./AllocationTableContainer";
import BackingCardHistory from "./History";

interface BackingCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

export const BackingCard = (props: BackingCardProps) => {
    // Data
    const { flt, ...boxProps } = props;
    const { symbol, collateral, debt, backings } = flt;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack
            data-testid="BackingCard"
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
                data-testid="BackingCardTitle"
            >
                Backing per {symbol}
            </Text>

            {/* Description */}
            <Text
                color={gray10}
                fontSize="sm"
                lineHeight="6"
                paddingX="4"
                margin="0 !important"
                data-testid="BackingCardDescription"
            >
                {symbol} represents collaterized debt position and can be
                redeemed at any time.
            </Text>

            {/* Allocation table */}
            <BackingCardAllocationTableContainer
                symbol={symbol}
                collateralSymbol={collateral.symbol}
                debtSymbol={debt.symbol}
                paddingX="2"
            />

            {/* Historical backing */}
            <BackingCardHistory
                collateralSymbol={collateral.symbol}
                debtSymbol={debt.symbol}
                backings={backings}
            />
        </VStack>
    );
};

export default BackingCard;
