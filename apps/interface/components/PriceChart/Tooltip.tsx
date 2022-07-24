import { HStack, Text, useColorModeValue } from "@chakra-ui/react";

// Utils
import { formatUSD } from "../../utils/formatUSD";
import { formatTimestamp } from "../../utils/formatTimestamp";

interface PriceChartLineTooltipProps {
    payload?: Array<{ payload: { timestamp: number; price: number } }>;
}

export const PriceChartLineTooltip = (props: PriceChartLineTooltipProps) => {
    // Data
    const { payload } = props;
    if (payload == null) return <div>PriceChartLineTooltip undefined</div>;
    const p = payload.at(0);
    if (p == null) return <div>undefined</div>;
    const point = p.payload;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <HStack
            data-testid="PriceChartLineTooltip"
            background={gray12}
            color={gray2}
            padding="2"
            borderRadius="lg"
        >
            <Text
                fontSize="sm"
                lineHeight="4"
                data-testid="PriceChartLineTooltipPrice"
            >
                {point && formatUSD(point.price)}
            </Text>
            <Text
                fontSize="sm"
                lineHeight="4"
                data-testid="PriceChartLineTooltipTimestamp"
            >
                {point && formatTimestamp(point.timestamp * 1000)}
            </Text>
        </HStack>
    );
};

export default PriceChartLineTooltip;
