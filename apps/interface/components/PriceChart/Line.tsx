/**
 * Line charts usually only plot the closing prices, thus reducing noise from
 * less critical times in the trading day, such as the open, high, and low prices.
 *
 * https://www.investopedia.com/terms/l/linechart.asp
 */
import { Box, useColorModeValue } from "@chakra-ui/react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    YAxis,
} from "recharts";

// Sub-components
import PriceChartLineTooltip from "./Tooltip";

export interface PriceChartLineProps {
    prices: Array<{ timestamp: number; price: number }>;
}

export const PriceChartLine = (props: PriceChartLineProps) => {
    // Data
    const { prices } = props;
    const latest = prices.at(-1);
    const oldest = prices.at(0);
    const priceChange = latest.price - oldest.price;

    // Styles
    // NOTE: need to use raw hex value for chart
    const green11 = useColorModeValue("#18794E", "#4CC38A");
    const red11 = useColorModeValue("#CD2B31", "#FF6369");

    if (latest == null || oldest == null) {
        return (
            <div data-testid="PriceChartLineUndefined">
                PriceChartLine undefined
            </div>
        );
    }

    return (
        <Box data-testid="PriceChartLine" w="100%" h="192px">
            <ResponsiveContainer width="100%" height={192}>
                <AreaChart
                    data={prices}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    width={300}
                    height={200}
                >
                    <Area
                        type="monotoneX"
                        dataKey="price"
                        strokeWidth={2}
                        stroke={priceChange > 0 ? green11 : red11}
                        fill={
                            priceChange > 0
                                ? "url(#upGradient)"
                                : "url(#downGradient)"
                        }
                        fillOpacity={0.2}
                        data-testid="PriceChartLineArea"
                    />
                    <YAxis
                        hide={true}
                        type="number"
                        domain={["dataMin - 5", "dataMax + 5"]}
                    />
                    <Tooltip
                        cursor={false}
                        content={
                            <PriceChartLineTooltip
                                oldestPrice={oldest.price}
                            />
                        }
                    />
                    <defs>
                        <linearGradient
                            id="upGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                            fillOpacity={0.2}
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
                            fillOpacity={0.2}
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

export default PriceChartLine;
