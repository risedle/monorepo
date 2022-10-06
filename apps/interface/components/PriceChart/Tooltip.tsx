import {
    Text,
    VStack,
    StackDivider,
    HStack,
    useColorModeValue,
} from "@chakra-ui/react";

// Utils
import formatUSD from "@/utils/formatUSD";
import { getDateFromTimestamp } from "@/utils/getDateFromTimestamp";
import { getHourFromTimestamp } from "@/utils/getHourFromTimestamp";
import formatPercent from "@/utils/formatPercent";

interface PriceChartLineTooltipProps {
    payload?: Array<{ payload: { timestamp: number; price: number } }>;
    oldestPrice: number;
}

const PriceChartLineTooltip = (props: PriceChartLineTooltipProps) => {
    // Style
    const background = useColorModeValue("gray.dark.2", "gray.dark.3");
    const text = useColorModeValue("gray.light.9", "gray.dark.10");

    // Data
    const { payload, oldestPrice } = props;
    if (payload == null) return <div>PriceChartLineTooltip undefined</div>;
    const p = payload.at(0);
    if (p == null) return <div>undefined</div>;
    const point = p.payload;

    const change = point.price - oldestPrice;
    const changePercent = change / oldestPrice;

    return (
        <VStack
            data-testid="PriceChartLineTooltip"
            background={background}
            color={text}
            paddingY="2"
            paddingX="3"
            border="1px"
            borderColor="gray.dark.4"
            borderRadius="lg"
            spacing="3"
            boxShadow="sm"
            divider={
                <StackDivider borderStyle="dashed" borderColor="gray.dark.5" />
            }
            minWidth="181px"
            align="start"
        >
            <Text
                fontSize="xs"
                lineHeight="4"
                data-testid="PriceChartLineTooltipTimestamp"
            >
                {point && getHourFromTimestamp(point.timestamp * 1000)}{" "}
                &middot;{" "}
                {point && getDateFromTimestamp(point.timestamp * 1000)}
            </Text>
            <VStack align="start">
                <HStack spacing="2">
                    <Text fontSize="xs" lineHeight="4">
                        Price
                    </Text>
                    <Text
                        fontSize="xs"
                        lineHeight="4"
                        fontWeight="semibold"
                        color="gray.dark.12"
                        data-testid="PriceChartLineTooltipPrice"
                    >
                        {point && formatUSD(point.price)}
                    </Text>
                </HStack>
                <HStack spacing="2">
                    <Text fontSize="xs" lineHeight="4">
                        Changes
                    </Text>
                    <Text
                        fontSize="xs"
                        lineHeight="4"
                        fontWeight="semibold"
                        color={change >= 0 ? "green.dark.11" : "red.dark.11"}
                        data-testid="PriceChartLineTooltipPriceChange"
                    >
                        {formatUSD(change)} ({formatPercent(changePercent)})
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
};

export default PriceChartLineTooltip;
