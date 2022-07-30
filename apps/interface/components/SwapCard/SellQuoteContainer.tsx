import { useContractReads } from "wagmi";
import { utils } from "ethers";

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
    });

    // console.debug("SwapCardSellQuoteContainer: sellAmount", sellAmount);
    // console.debug("SwapCardSellQuoteContainer: amountOut", amountOut);
    // console.debug("SwapCardSellQuoteContainer: data", data);

    // Parse data from contracts
    let quoteAmount = 0;
    let quoteAmountUSD = 0;
    let isLoaded = false;
    if (data && data.length == 2) {
        isLoaded = true;
        quoteAmount = parseFloat(
            utils.formatUnits(data[0], defaultQuoteDecimals)
        );
        const quotePrice = parseFloat(
            utils.formatUnits(data[1], defaultQuoteChainlinkDecimals)
        );
        quoteAmountUSD = quoteAmount * quotePrice;
    }

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
