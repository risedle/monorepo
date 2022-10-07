import { useEffect, useState } from "react";

// Hooks
import useSlippageToleranceStore from "@/hooks/useSlippageToleranceStore";

// Sub-components
import SlippageTolerance from "./SlippageTolerance";

const SlippageToleranceContainer = () => {
    // Hooks
    const persistedSlippage = useSlippageToleranceStore(
        (state) => state.slippage
    );
    const setPersistedSlippage = useSlippageToleranceStore(
        (state) => state.setSlippage
    );
    const [slippage, setSlippage] = useState("");

    // NOTE: This is to enable server-side rendering when we persist state
    useEffect(() => {
        setSlippage(persistedSlippage);
    }, [persistedSlippage]);

    return (
        <SlippageTolerance
            slippage={slippage}
            setSlippage={setPersistedSlippage}
        />
    );
};

export default SlippageToleranceContainer;
