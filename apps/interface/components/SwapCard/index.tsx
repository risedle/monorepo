import { VStack, useColorModeValue } from "@chakra-ui/react";

import { FuseLeveragedToken } from "../../utils/types";

import SwapCardTitle from "./Title";
import SwapCardLatestPriceInfoContainer from "./LatestPriceInfoContainer";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SwapProps extends FuseLeveragedToken {}

export const SwapCard = (props: SwapProps) => {
    const { name, symbol } = props;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");

    return (
        <VStack
            data-testid="SwapCard"
            alignItems="flex-start"
            padding="4"
            background={gray2}
            borderRadius="2xl"
            gap={4}
        >
            {/* Swap Card Title */}
            <SwapCardTitle name={name} symbol={symbol} />

            {/* Swap Card Latest Price Info */}
            <SwapCardLatestPriceInfoContainer symbol={symbol} />
        </VStack>
    );
};

export default SwapCard;
