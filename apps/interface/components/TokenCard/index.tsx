import {
    VStack,
    Box,
    Text,
    Divider,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";

import type { FuseLeveragedToken } from "../../utils/fetchFuseLeveragedTokens";

import { TokenCardTitle } from "./title";
import { TokenCardCharts } from "./charts";

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
        "1D": { prices: chartPrices.slice(0, 24) },
        "1W": { prices: chartPrices.slice(0, 24 * 7) },
        "2W": { prices: chartPrices.slice(0, 24 * 7 * 2) },
        "3W": { prices: chartPrices.slice(0, 24 * 7 * 3) },
        "1M": { prices: chartPrices },
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
        >
            {/* Token Card Title */}
            <TokenCardTitle name={name} symbol={symbol} />

            {/* Show price chart */}
            <TokenCardCharts timeframes={timeframes} />

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

            {/* Show latest data */}
            <SimpleGrid columns={3} width="100%" padding="4">
                <VStack textAlign="left">
                    <Text width="100%">Price</Text>
                    <Text width="100%">20</Text>
                </VStack>
                <VStack textAlign="left">
                    <Text width="100%">Changes</Text>
                    <Text width="100%">20</Text>
                </VStack>
                <VStack textAlign="left">
                    <Text width="100%">Capacity</Text>
                    <Text width="100%">20</Text>
                </VStack>
            </SimpleGrid>
        </VStack>
    );
};
