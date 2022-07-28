import {
    BoxProps,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";

// Sub-components
import SwapCardInput from "./Input";
import SwapCardBalance from "./Balance";

interface SwapCardProps extends BoxProps {
    symbol: string;
}

export const SwapCard = (props: SwapCardProps) => {
    // Data
    const { symbol } = props;

    // Styles
    const gray1 = useColorModeValue("gray.light.1", "gray.dark.1");
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray3 = useColorModeValue("gray.light.3", "gray.dark.3");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Tabs
            data-testid="SwapCard"
            background={gray1}
            borderRadius="2xl"
            border="1px"
            borderColor={gray2}
            width="360px"
        >
            <VStack alignItems="flex-start" gap={6}>
                <TabList
                    data-testid="SwapCardTabs"
                    border="0"
                    paddingX="4"
                    paddingTop="4"
                >
                    <Tab
                        data-testid="SwapCardBuyButton"
                        fontSize="sm"
                        lineHeight="4"
                        color={gray10}
                        borderRadius="lg"
                        paddingX="5"
                        paddingY="3"
                        _selected={{
                            color: gray12,
                            fontWeight: "semibold",
                            background: gray3,
                        }}
                        _active={{ background: gray3 }}
                    >
                        Buy
                    </Tab>
                    <Tab
                        data-testid="SwapCardBuyButton"
                        fontSize="sm"
                        lineHeight="4"
                        color={gray10}
                        borderRadius="lg"
                        paddingX="5"
                        paddingY="3"
                        _selected={{
                            color: gray12,
                            fontWeight: "semibold",
                            background: gray3,
                        }}
                        _active={{ background: gray3 }}
                    >
                        Sell
                    </Tab>
                </TabList>

                {/* Form input and balance*/}
                <VStack
                    data-testid="SwapCardInputBalance"
                    gap={2}
                    margin="0 !important"
                    alignItems="flex-start"
                    width="100%"
                >
                    <SwapCardInput symbol={symbol} />
                    {/* Container here; Balance only show data only */}
                    <SwapCardBalance
                        amount={0}
                        amountUSD={0}
                        isLoaded={true}
                    />
                </VStack>
            </VStack>

            <TabPanels>
                <TabPanel>
                    <p>Buy</p>
                </TabPanel>
                <TabPanel>
                    <p>Sell</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default SwapCard;
