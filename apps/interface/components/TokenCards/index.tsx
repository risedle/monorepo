import {
    Container,
    Flex,
    Box,
    SimpleGrid,
    useColorModeValue,
    VStack,
    Text,
    Center,
    Button,
    Spacer,
    Tabs,
    TabPanels,
    TabPanel,
    TabList,
    Tab,
    Image,
    HStack,
    Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    YAxis,
} from "recharts";

import type {
    FuseLeveragedTokens,
    FuseLeveragedToken,
} from "../../utils/fetchFuseLeveragedTokens";
import { FuseLeveragedTokenIcon } from "../FuseLeveragedTokenIcon";

/**
 * This is presentational component. Only display price chart.
 */

interface PriceChartProps {
    prices: Array<{ timestamp: number; price: number }>;
    priceChange: number; // -100 to 100
    onHover: (price: number, timestamp: number) => void;
    onMouseLeave: () => void;
}

const PriceChart = (props: PriceChartProps) => {
    const { prices, priceChange, onHover, onMouseLeave } = props;

    return (
        <Box h="200px" w="100%" data-testid="PriceChart">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={prices}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    onMouseLeave={onMouseLeave}
                >
                    <Area
                        type="monotoneX"
                        dataKey="price"
                        strokeWidth={2}
                        stroke={priceChange > 0 ? "#4CC38A" : "#CD2B31"}
                        fill={
                            priceChange > 0
                                ? "url(#upGradient)"
                                : "url(#downGradient)"
                        }
                    />
                    <YAxis
                        hide={true}
                        type="number"
                        domain={["dataMin - 5", "dataMax + 5"]}
                    />
                    <Tooltip
                        position={{ y: 0 }}
                        content={({ active, payload }) => {
                            if (active && payload) {
                                //const price = payload[0].payload;
                                //const timestamp = selectedData.timestamp;
                                //onHover(price, timestamp);
                            }
                            return null;
                        }}
                    />
                    <defs>
                        <linearGradient
                            id="upGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="rgba(37, 208, 171)"
                                stopOpacity={0.4}
                            />
                            <stop
                                offset="100%"
                                stopColor="rgba(37, 208, 171)"
                                stopOpacity={0}
                            />
                        </linearGradient>
                        <linearGradient
                            id="downGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="rgb(205, 43, 49)"
                                stopOpacity={0.4}
                            />
                            <stop
                                offset="100%"
                                stopColor="rgb(205, 43, 49)"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
};

interface PriceChartsProps {
    timeframes: Record<string, PriceChartProps>;
}

const PriceCharts = (props: PriceChartsProps) => {
    // Data
    const { timeframes } = props;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray11 = useColorModeValue("gray.light.11", "gray.dark.11");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    const tabs = Object.keys(timeframes).map((timeframe) => {
        return (
            <Tab
                fontSize="xs"
                lineHeight="4"
                color={gray11}
                borderRadius="full"
                _selected={{
                    fontWeight: "semibold",
                    color: gray12,
                    background: gray2,
                    border: "1px",
                    borderColor: gray4,
                }}
                _hover={{
                    fontWeight: "semibold",
                    color: gray12,
                    background: gray2,
                    border: "1px",
                    borderColor: gray4,
                }}
            >
                {timeframe}
            </Tab>
        );
    });
    const panels = Object.entries(timeframes).map((timeframe) => {
        const [, chartProp] = timeframe;
        return (
            <TabPanel padding="0">
                <PriceChart {...chartProp} />
            </TabPanel>
        );
    });

    return (
        <Tabs defaultIndex={2} width="100%" marginTop="0 !important">
            <TabPanels>{panels}</TabPanels>
            <TabList borderBottom="0" paddingX="4" marginTop="2">
                <SimpleGrid width="100%" columns={tabs.length} gap="2">
                    {tabs}
                </SimpleGrid>
            </TabList>
        </Tabs>
    );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TokenCardProps extends FuseLeveragedToken {}

// TODO(pyk): use two component TokenCardContainer to fetch latest price and so
// on and TokenCard for presentational only
const TokenCard = (props: TokenCardProps) => {
    // Data
    const { name, symbol, prices } = props;
    const priceChange = 1;
    const onHover = (price: number, timestamp: number) => {
        console.log("onHover");
    };
    const onMouseLeave = () => {
        console.log("onMouseLeave");
    };

    // Create timeframes
    const chartPrices = prices.map((price) => ({
        timestamp: price.timestamp,
        price: parseFloat(price.close),
    }));
    const timeframes = {
        "1D": {
            prices: chartPrices.slice(0, 24),
            priceChange,
            onHover,
            onMouseLeave,
        },
        "1W": {
            prices: chartPrices.slice(0, 24 * 7),
            priceChange,
            onHover,
            onMouseLeave,
        },
        "2W": {
            prices: chartPrices.slice(0, 24 * 7 * 2),
            priceChange,
            onHover,
            onMouseLeave,
        },
        "3W": {
            prices: chartPrices.slice(0, 24 * 7 * 3),
            priceChange,
            onHover,
            onMouseLeave,
        },
        "1M": {
            prices: chartPrices,
            priceChange,
            onHover,
            onMouseLeave,
        },
    };

    // Styles
    const gray1 = useColorModeValue("gray.light.1", "gray.dark.1");
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray9 = useColorModeValue("gray.light.9", "gray.dark.9");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack
            bg="tomato"
            width="100%"
            minW="343px"
            background={gray1}
            border="1px"
            borderColor={gray3}
            borderRadius="3xl"
        >
            {/* Token basic info */}
            <Box paddingX="4" paddingY="5" w="100%">
                <Flex>
                    <FuseLeveragedTokenIcon name={name} symbol={symbol} />
                    <Center paddingLeft="4">
                        <VStack flex="1" textAlign="left" spacing="1">
                            <Text
                                w="100%"
                                fontSize="sm"
                                fontWeight="bold"
                                lineHeight="4"
                                letterSpacing="tight"
                                color={gray12}
                            >
                                {symbol}
                            </Text>
                            <Text
                                w="100%"
                                fontSize="sm"
                                lineHeight="4"
                                letterSpacing="tight"
                                color={gray10}
                            >
                                {name}
                            </Text>
                        </VStack>
                    </Center>
                    <Spacer />
                    <NextLink href={`/trade/${symbol.toLowerCase()}`} passHref>
                        <Button as="a" data-testid="TokenCardOpen">
                            <Text>Open</Text>
                        </Button>
                    </NextLink>
                </Flex>
            </Box>

            {/* Show price chart */}
            <PriceCharts timeframes={timeframes} />

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TokenCardsProps extends FuseLeveragedTokens {}

export const TokenCards = (props: TokenCardsProps) => {
    // Data
    const { tokens } = props;
    const cards = tokens.map((token) => (
        <TokenCard {...token} key={token.address} />
    ));

    return (
        <Container maxW="7xl" py="3" data-testid="Heading">
            <SimpleGrid
                columns={{ base: 1, laptop: 2, desktop: 3 }}
                spacing="6"
                margin="auto"
                maxW={{ base: "400px", laptop: "730px", desktop: "100%" }}
            >
                {cards}
            </SimpleGrid>
        </Container>
    );
};
