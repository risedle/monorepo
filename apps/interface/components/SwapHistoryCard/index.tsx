import {
    BoxProps,
    VStack,
    Text,
    useColorModeValue,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";

// Utils
import type { FuseLeveragedToken } from "@/utils/types";

// Sub-components
import SwapHistoryCardTable from "./Table";
import MySwapHistoryContainer from "./MySwapContainer";

interface SwapHistoryCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

export const SwapHistoryCard = (props: SwapHistoryCardProps) => {
    const { flt, ...boxProps } = props;
    const { swaps, symbol } = flt;

    // Styles
    const gray1 = useColorModeValue("gray.light.1", "gray.dark.1");
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray4 = useColorModeValue("gray.light.4", "gray.dark.4");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <VStack
            data-testid="SwapHistoryCard"
            alignItems="flex-start"
            background={gray2}
            borderRadius="2xl"
            gap={6}
            margin="0 !important"
            {...boxProps}
        >
            {/* Title */}
            <Text
                color={gray12}
                fontWeight="bold"
                fontSize="md"
                lineHeight="4"
                paddingX="4"
                paddingTop="4"
            >
                Latest swaps
            </Text>

            {/* Tabs: All and my swaps*/}
            <Tabs
                data-testid="SwapHistoryCardTabs"
                width="100%"
                margin="0 !important"
            >
                <TabList
                    background={gray1}
                    padding="1"
                    borderRadius="12px"
                    border="0"
                    marginX="4"
                    data-testid="SwapHistoryCardTabList"
                    width="max"
                >
                    <Tab
                        fontSize="xs"
                        lineHeight="4"
                        _selected={{
                            color: gray12,
                            fontWeight: "semibold",
                            background: gray4,
                        }}
                        padding="2"
                        borderRadius="lg"
                        margin="0 !important"
                        color={gray10}
                        data-testid="SwapHistoryCardAllSwapsButton"
                    >
                        All swaps
                    </Tab>
                    <Tab
                        fontSize="xs"
                        lineHeight="4"
                        _selected={{
                            color: gray12,
                            fontWeight: "semibold",
                            background: gray4,
                        }}
                        padding="2"
                        borderRadius="lg"
                        margin="0 !important"
                        color={gray10}
                        data-testid="SwapHistoryCardMySwapsButton"
                    >
                        My swaps
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel paddingX="2" paddingTop="6" paddingBottom="4">
                        <SwapHistoryCardTable swaps={swaps} isLoaded={true} />
                    </TabPanel>
                    <TabPanel paddingX="2" paddingTop="6" paddingBottom="4">
                        <MySwapHistoryContainer symbol={symbol} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    );
};

export default SwapHistoryCard;
