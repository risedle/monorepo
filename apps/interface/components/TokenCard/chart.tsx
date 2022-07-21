import { Box } from "@chakra-ui/react";
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    YAxis,
} from "recharts";

// TODO(pyk): add flt symbol here to control zustand state
export interface TokenCardChartProps {
    prices: Array<{ timestamp: number; price: number }>;
}

export const TokenCardChart = (props: TokenCardChartProps) => {
    const { prices } = props;

    // TODO(pyk): import zustand store here to get priceChange and set hovered
    // price and timestamp
    const priceChange = 1;

    return (
        <Box h="200px" w="100%" data-testid="PriceChart">
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                    data={prices}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    onMouseLeave={() => {
                        // TODO(pyk): reset hovered state from zustand here
                    }}
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
                        content={() => {
                            // TODO(pyk): set hovered state from zustand here
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
