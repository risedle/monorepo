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
import useBuyAmountStore from "@/hooks/useBuyAmountStore";

// Props
interface SwapCardBuyQuoteContainerProps {
    fltAddress: string;
}

export const SwapCardBuyQuoteContainer = (
    props: SwapCardBuyQuoteContainerProps
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
    const amount = useBuyAmountStore((state) => state.amount);
    const buyAmount = amount == "" ? "0" : `${parseFloat(amount)}`;
    const amountOut = utils.parseUnits(buyAmount, "ether").toString();

    // TODO(pyk): add toast when error
    const { data } = useContractReads({
        contracts: [
            {
                addressOrName: routerAddress,
                contractInterface: RouterABI,
                functionName: "getAmountIn",
                args: [fltAddress, defaultQuoteAddress, amountOut],
            },
            {
                addressOrName: defaultQuoteChainlinkAddress,
                contractInterface: ChainlinkABI,
                functionName: "latestAnswer",
            },
        ],
        watch: true,
    });

    // console.debug("SwapCardBuyQuoteContainer: buyAmount", buyAmount);
    // console.debug("SwapCardBuyQuoteContainer: amountOut", amountOut);
    // console.debug("SwapCardBuyQuoteContainer: data", data);

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
            label="You will send"
            quoteAmount={quoteAmount}
            quoteAmountUSD={quoteAmountUSD}
            quoteSymbol={defaultQuoteSymbol}
            isLoaded={isLoaded}
        />
    );
};

export default SwapCardBuyQuoteContainer;
