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
import SwapCardBuyQuoteContainer from "./BuyQuoteContainer";
import SwapCardBuyCTAContainer from "./BuyCTAContainer";
import SwapCardSellAmountContainer from "./SellAmountContainer";
import SwapCardSellBalanceContainer from "./SellBalanceContainer";
import SwapCardSellQuoteContainer from "./SellQuoteContainer";
import SwapCardSellCTAContainer from "./SellCTAContainer";
import SwapCardSlippageToleranceContainer from "./SlippageToleranceContainer";
import SwapCardQuoteBalanceContainer from "./QuoteBalanceContainer";

interface SwapCardProps extends BoxProps {
    flt: FuseLeveragedToken;
}

const SwapCard = (props: SwapCardProps) => {
    // Data
    const { flt } = props;
    const { symbol, address, debt } = flt;

    // Styles
    const backgroundTabColor = useColorModeValue(
        "gray.light.3",
        "gray.dark.1 "
    );
    const selectedTabColor = useColorModeValue("gray.light.1", "gray.dark.3");
    const borderTabColor = useColorModeValue("gray.light.3", "gray.dark.2");
    const gray10 = useColorModeValue("gray.light.10", "gray.dark.10");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Tabs
            data-testid="SwapCard"
            background={backgroundTabColor}
            borderRadius="2xl"
            border="1px"
            borderColor={borderTabColor}
            width="100%"
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
                            background: selectedTabColor,
                        }}
                        _active={{ background: selectedTabColor }}
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
                            background: selectedTabColor,
                        }}
                        _active={{ background: selectedTabColor }}
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
                                alignItems="flex-start"
                            >
                                {/* Slippage tolerance */}
                                <SwapCardSlippageToleranceContainer />
                                {/* Quote */}
                                <SwapCardBuyQuoteContainer
                                    fltAddress={address}
                                />
                                {/* Quote token balance */}
                                <SwapCardQuoteBalanceContainer />
                                <SwapCardBuyCTAContainer
                                    fltAddress={address}
                                    fltSymbol={symbol}
                                    fltDebtAddress={debt.address}
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
                            <VStack
                                data-testid="SlippageAndQuote"
                                margin="0 !important"
                                width="100%"
                            >
                                {/* Slippage tolerance */}
                                <SwapCardSlippageToleranceContainer />
                                {/* Quote */}
                                <SwapCardSellQuoteContainer
                                    fltAddress={address}
                                />
                                {/* Quote token balance */}
                                <SwapCardQuoteBalanceContainer />
                                <SwapCardSellCTAContainer
                                    fltAddress={address}
                                />
                            </VStack>
                        </VStack>
                    </TabPanel>
                </TabPanels>
            </VStack>
        </Tabs>
    );
};

export default SwapCard;
