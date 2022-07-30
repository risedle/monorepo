import {
    VStack,
    Box,
    BoxProps,
    Divider,
    useColorModeValue,
} from "@chakra-ui/react";

import { FuseLeveragedToken } from "@/utils/types";

import TradeInfoCardTitle from "./Title";
import TradeInfoCardLatestPriceContainer from "./LatestPriceContainer";
import PriceChart from "../PriceChart";
import TradeInfoCardUserPositionContainer from "./UserPositionContainer";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TradeInfoCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

export const TradeInfoCard = (props: TradeInfoCardProps) => {
    // Data
    const { flt, ...boxProps } = props;
    const { name, symbol, prices, address } = flt;

    // Create timeframes
    const chartPrices = prices.map((price) => ({
        timestamp: price.timestamp,
        price: parseFloat(price.close),
    }));
    const timeframes = {
        "1D": { prices: chartPrices.slice(0, 25).reverse() },
        "1W": { prices: chartPrices.slice(0, 24 * 7 + 1).reverse() },
        "2W": { prices: chartPrices.slice(0, 24 * 7 * 2 + 1).reverse() },
        "3W": { prices: chartPrices.slice(0, 24 * 7 * 3 + 1).reverse() },
        "1M": { prices: chartPrices.reverse() },
    };

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray5 = useColorModeValue("gray.light.5", "gray.dark.5");

    return (
        <VStack
            data-testid="TradeInfoCard"
            alignItems="flex-start"
            background={gray2}
            borderRadius="2xl"
            gap={4}
            {...boxProps}
        >
            {/* Swap Card Title */}
            <TradeInfoCardTitle
                name={name}
                symbol={symbol}
                paddingX="4"
                paddingTop="4"
            />

            {/* Swap Card Latest Price Info */}
            <TradeInfoCardLatestPriceContainer symbol={symbol} paddingX="4" />

            {/* Show price chart */}
            {/* The props 'display' and 'justifyContent' is used to prevent timeframes stretch in trade page */}
            <PriceChart
                timeframes={timeframes}
                display="flex"
                justifyContent={{ base: "center", tablet: "start" }}
            />

            <Box
                width="100%"
                paddingX="4"
                margin="0 !important"
                display={{ base: "block", tablet: "none" }}
            >
                <Divider borderStyle="dashed" borderColor={gray5} />
            </Box>

            {/* Show user position */}
            <TradeInfoCardUserPositionContainer
                paddingX="4"
                paddingBottom="4"
                paddingTop="2"
                fltAddress={address}
            />
        </VStack>
    );
};

export default TradeInfoCard;
