import { VStack, useColorModeValue } from "@chakra-ui/react";

import { FuseLeveragedToken } from "../../utils/types";

import SwapCardTitle from "./Title";
import SwapCardLatestPriceInfoContainer from "./LatestPriceInfoContainer";
import PriceChart from "../PriceChart";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SwapProps extends FuseLeveragedToken {}

export const SwapCard = (props: SwapProps) => {
    // Data
    const { name, symbol, prices } = props;

    // Create timeframes
    const chartPrices = prices.map((price) => ({
        timestamp: price.timestamp,
        price: parseFloat(price.close),
    }));
    const timeframes = {
        "1D": { prices: chartPrices.slice(0, 24).reverse() },
        "1W": { prices: chartPrices.slice(0, 24 * 7).reverse() },
        "2W": { prices: chartPrices.slice(0, 24 * 7 * 2).reverse() },
        "3W": { prices: chartPrices.slice(0, 24 * 7 * 3).reverse() },
        "1M": { prices: chartPrices.reverse() },
    };

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");

    return (
        <VStack
            data-testid="SwapCard"
            alignItems="flex-start"
            background={gray2}
            borderRadius="2xl"
            gap={4}
        >
            {/* Swap Card Title */}
            <SwapCardTitle
                name={name}
                symbol={symbol}
                paddingX="4"
                paddingTop="4"
            />

            {/* Swap Card Latest Price Info */}
            <SwapCardLatestPriceInfoContainer symbol={symbol} paddingX="4" />

            {/* Show price chart */}
            <PriceChart timeframes={timeframes} />
        </VStack>
    );
};

export default SwapCard;
