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

// Utils
import type { FuseLeveragedToken } from "@/utils/types";

// Sub-components
import SwapCardBuyAmountContainer from "./BuyAmountContainer";
import SwapCardBuyBalanceContainer from "./BuyBalanceContainer";
import SwapCardSellAmountContainer from "./SellAmountContainer";
import SwapCardSellBalanceContainer from "./SellBalanceContainer";
import SwapCardSlippageToleranceContainer from "./SlippageToleranceContainer";
import SwapCardQuote from "./Quote";

interface SwapCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

export const SwapCard = (props: SwapCardProps) => {
    // Data
    const { flt } = props;
    const { symbol, address } = flt;

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

                <TabPanels margin="0 !important">
                    {/* Buy */}
                    <TabPanel data-testid="BuyTabPanel" padding="0">
                        <VStack data-testid="BuyTabPanelStack" gap={6}>
                            {/* Form input and balance*/}
                            <VStack
                                data-testid="SwapCardBuyInputBalance"
                                gap={2}
                                margin="0 !important"
                                alignItems="flex-start"
                                width="100%"
                            >
                                <SwapCardBuyAmountContainer symbol={symbol} />
                                <SwapCardBuyBalanceContainer
                                    fltAddress={address}
                                />
                            </VStack>
                            <VStack
                                data-testid="SlippageAndQuote"
                                margin="0 !important"
                                width="100%"
                            >
                                {/* Slippage tolerance */}
                                <SwapCardSlippageToleranceContainer />
                                {/* Quote */}
                                <SwapCardQuote
                                    label="You will send"
                                    quoteAmount="1.123123"
                                    quoteSymbol="BUSD"
                                    isLoaded={false}
                                />
                            </VStack>
                        </VStack>
                    </TabPanel>

                    {/* Sell */}
                    <TabPanel data-testid="SellTabPanel" padding="0">
                        <VStack data-testid="SellTabPanelStack" gap={6}>
                            {/* Form input and balance*/}
                            <VStack
                                data-testid="SwapCardSellInputBalance"
                                gap={2}
                                margin="0 !important"
                                alignItems="flex-start"
                                width="100%"
                            >
                                <SwapCardSellAmountContainer symbol={symbol} />
                                <SwapCardSellBalanceContainer
                                    fltAddress={address}
                                />
                            </VStack>
                            {/* Slippage tolerance */}
                            <SwapCardSlippageToleranceContainer />
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </VStack>
        </Tabs>
    );
};

export default SwapCard;
