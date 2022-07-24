import {
    VStack,
    Box,
    Text,
    Divider,
    useColorModeValue,
} from "@chakra-ui/react";

import type { FuseLeveragedToken } from "../../utils/types";

import { TokenCardTitle } from "./title";
import PriceChart from "../PriceChart";
import { TokenCardInfoContainer } from "../TokenCardInfo/container";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TokenCardProps extends FuseLeveragedToken {}

export const TokenCard = (props: TokenCardProps) => {
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
    const gray1 = useColorModeValue("gray.light.1", "gray.dark.1");
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray9 = useColorModeValue("gray.light.9", "gray.dark.9");

    return (
        <VStack
            width="100%"
            minW="343px"
            background={gray1}
            border="1px"
            borderColor={gray3}
            borderRadius="3xl"
            data-testid="TokenCard"
        >
            {/* Token Card Title */}
            <TokenCardTitle name={name} symbol={symbol} />

            {/* Show price chart */}
            <PriceChart timeframes={timeframes} />

            {/* Show description */}
            <Text
                fontSize="xs"
                lineHeight="4"
                color={gray9}
                padding="4"
                marginTop="0 !important"
            >
                Enjoy increased leverage {name.replace(" Risedle", "")} with no
                loans or liquidations
            </Text>

            {/* Divider */}
            <Box width="100%" paddingX="4" margin="0 !important">
                <Divider
                    orientation="horizontal"
                    borderStyle="dashed"
                    borderColor={gray3}
                />
            </Box>

            {/* Show latest on-chain data */}
            <TokenCardInfoContainer symbol={symbol} />
        </VStack>
    );
};
