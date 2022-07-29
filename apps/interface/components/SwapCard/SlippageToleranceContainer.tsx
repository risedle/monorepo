// Hooks
import useSlippageToleranceStore from "@/hooks/useSlippageToleranceStore";

// Sub-components
import SlippageTolerance from "./SlippageTolerance";

export const SlippageToleranceContainer = () => {
    // State
    const slippage = useSlippageToleranceStore((state) => state.slippage);
    const setSlippage = useSlippageToleranceStore(
        (state) => state.setSlippage
    );

    return <SlippageTolerance slippage={slippage} setSlippage={setSlippage} />;
};

export default SlippageToleranceContainer;
