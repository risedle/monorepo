import {
    Tabs,
    TabPanels,
    TabPanel,
    TabList,
    Tab,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";

import { PriceChartLine, PriceChartLineProps } from "./Line";

interface PriceChartProps {
    timeframes: Record<string, PriceChartLineProps>;
}

export const PriceChart = (props: PriceChartProps) => {
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
                key={timeframe}
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
                    color: gray12,
                }}
                _active={{
                    color: gray12,
                }}
            >
                {timeframe}
            </Tab>
        );
    });
    const panels = Object.entries(timeframes).map((timeframe) => {
        const [id, chartProp] = timeframe;
        return (
            <TabPanel padding="0" key={id}>
                <PriceChartLine {...chartProp} />
            </TabPanel>
        );
    });

    return (
        <Tabs
            defaultIndex={0}
            width="100%"
            marginTop="0 !important"
            display={{ base: "none", tablet: "block" }}
        >
            <TabPanels>{panels}</TabPanels>
            <TabList borderBottom="0" paddingX="4" marginTop="2">
                <SimpleGrid
                    width="100%"
                    columns={tabs.length}
                    gap="2"
                    display="flex"
                    justifyContent={{ base: "center", tablet: "start" }}
                >
                    {tabs}
                </SimpleGrid>
            </TabList>
        </Tabs>
    );
};

export default PriceChart;
