import { useContractReads } from "wagmi";
import { utils } from "ethers";
import { useEffect, useState } from "react";

// Utils
import getBaseConfig from "@/utils/getBaseConfig";

// Sub-components
import Quote from "./Quote";

// ABI
import RouterABI from "@/abis/RouterABI";
import ChainlinkABI from "@/abis/ChainlinkABI";

// Hooks
import useSellAmountStore from "@/hooks/useSellAmountStore";

// Props
interface SwapCardSellQuoteContainerProps {
    fltAddress: string;
}

export const SwapCardSellQuoteContainer = (
    props: SwapCardSellQuoteContainerProps
) => {
    // Data
    const {
        defaultQuoteAddress,
        defaultQuoteSymbol,
        defaultQuoteDecimals,
        defaultQuoteChainlinkAddress,
        defaultQuoteChainlinkDecimals,
        routerAddress,
    } = getBaseConfig();
    const { fltAddress } = props;

    // States
    const [isLoaded, setIsLoaded] = useState(false);
    const [quoteAmount, setQuoteAmount] = useState(0);
    const [quoteAmountUSD, setQuoteAmountUSD] = useState(0);
    const amount = useSellAmountStore((state) => state.amount);
    // We need to parse amount to remove multiple dots
    const sellAmount = amount == "" ? "0" : `${parseFloat(amount)}`;
    const amountIn = utils.parseUnits(sellAmount, "ether").toString();

    // TODO(pyk): add toast when error
    const { data } = useContractReads({
        contracts: [
            {
                addressOrName: routerAddress,
                contractInterface: RouterABI,
                functionName: "getAmountOut",
                args: [fltAddress, defaultQuoteAddress, amountIn],
            },
            {
                addressOrName: defaultQuoteChainlinkAddress,
                contractInterface: ChainlinkABI,
                functionName: "latestAnswer",
            },
        ],
        watch: true,
        cacheOnBlock: true,
    });

    // NOTE: we use useEffect here to prevent React Hydration Error
    // read more: https://nextjs.org/docs/messages/react-hydration-error
    useEffect(() => {
        // Parse data from contracts
        if (data && data[0] == null) {
            setIsLoaded(true);
            setQuoteAmount(0);
            setQuoteAmountUSD(0);
        }

        if (data && data.length == 2) {
            const quoteAmount = parseFloat(
                utils.formatUnits(data[0], defaultQuoteDecimals)
            );
            const quotePrice = parseFloat(
                utils.formatUnits(data[1], defaultQuoteChainlinkDecimals)
            );
            const quoteAmountUSD = quoteAmount * quotePrice;

            setIsLoaded(true);
            setQuoteAmount(quoteAmount);
            setQuoteAmountUSD(quoteAmountUSD);
        }
    });

    return (
        <Quote
            label="You will receive"
            quoteAmount={quoteAmount}
            quoteAmountUSD={quoteAmountUSD}
            quoteSymbol={defaultQuoteSymbol}
            isLoaded={isLoaded}
        />
    );
};

export default SwapCardSellQuoteContainer;
