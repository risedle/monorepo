import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    YAxis,
} from "recharts";

import { formatUSD } from "../../utils/formatUSD";
import { formatTimestamp } from "../../utils/formatTimestamp";

interface TokenCardChartTooltipProps {
    payload?: Array<{ payload: { timestamp: number; price: number } }>;
}

export const TokenCardChartTooltip = (props: TokenCardChartTooltipProps) => {
    // Data
    if (props.payload == null) return <div>Props Undefined</div>;
    const point = props.payload[0].payload;

    // Styles
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");

    return (
        <HStack data-testid="TokenCardChartTooltip">
            <Text
                fontSize="sm"
                color={gray10}
                lineHeight="4"
                data-testid="TokenCardChartTooltipPrice"
            >
                {point && formatUSD(point.price)}
            </Text>
            <Text
                fontSize="sm"
                color={gray10}
                lineHeight="4"
                data-testid="TokenCardChartTooltipTimestamp"
            >
                {point && formatTimestamp(point.timestamp * 1000)}
            </Text>
        </HStack>
    );
};

export interface TokenCardChartProps {
    prices: Array<{ timestamp: number; price: number }>;
}

export const TokenCardChart = (props: TokenCardChartProps) => {
    const { prices } = props;
    const latest = prices.at(-1);
    const oldest = prices.at(0);
    if (latest == null || oldest == null) return <div>undefined</div>;
    const priceChange = latest.price - oldest.price;

    return (
        <Box h="200px" data-testid="PriceChart" minW="200px !important">
            <ResponsiveContainer width={300} height={200}>
                <AreaChart
                    data={prices}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
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
                        data-testid="TokenCardChartArea"
                    />
                    <YAxis
                        hide={true}
                        type="number"
                        domain={["dataMin - 5", "dataMax + 5"]}
                    />
                    <Tooltip
                        position={{ y: 0, x: 16 }}
                        content={<TokenCardChartTooltip />}
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
