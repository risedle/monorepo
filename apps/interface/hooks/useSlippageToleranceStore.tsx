import create from "zustand";
import { persist } from "zustand/middleware";

interface SlippageToleranceState {
    slippage: string;
    setSlippage: (slippage: string) => void;
}

export const useSlippageToleranceStore = create<SlippageToleranceState>()(
    persist((set) => ({
        slippage: "0.005", // 0.5%
        setSlippage: (slippage) => set((state) => ({ slippage })),
    }))
);

export default useSlippageToleranceStore;
