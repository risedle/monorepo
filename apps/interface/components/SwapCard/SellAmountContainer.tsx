// Hooks
import useSellAmountStore from "@/hooks/useSellAmountStore";

// Utils
import replacer from "@/utils/replacer";

// Sub-components
import SwapCardInput from "./Input";

interface SwapCardSellAmountContainerProps {
    symbol: string;
}

const SwapCardSellAmountContainer = (
    props: SwapCardSellAmountContainerProps
) => {
    // Data
    const { symbol } = props;

    // State
    const amount = useSellAmountStore((state) => state.amount);
    const setAmount = useSellAmountStore((state) => state.setAmount);

    return (
        <SwapCardInput
            symbol={symbol}
            value={amount}
            // Replace comma with dot
            onAmountChange={replacer(",", ".", setAmount)}
        />
    );
};

export default SwapCardSellAmountContainer;
