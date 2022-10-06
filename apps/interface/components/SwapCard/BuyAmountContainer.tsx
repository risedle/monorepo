// Hooks
import useBuyAmountStore from "@/hooks/useBuyAmountStore";

// Utils
import replacer from "@/utils/replacer";

// Sub-components
import SwapCardInput from "./Input";

interface SwapCardBuyAmountContainerProps {
    symbol: string;
}

const SwapCardBuyAmountContainer = (
    props: SwapCardBuyAmountContainerProps
) => {
    // Data
    const { symbol } = props;

    // State
    const amount = useBuyAmountStore((state) => state.amount);
    const setAmount = useBuyAmountStore((state) => state.setAmount);

    return (
        <SwapCardInput
            symbol={symbol}
            value={amount}
            // Replace comma with dot
            onAmountChange={replacer(",", ".", setAmount)}
        />
    );
};

export default SwapCardBuyAmountContainer;
