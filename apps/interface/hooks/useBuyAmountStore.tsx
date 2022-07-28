import create from "zustand";
import { persist } from "zustand/middleware";

interface BuyAmountState {
    amount: string;
    setAmount: (amount: string) => void;
}

export const useBuyAmountStore = create<BuyAmountState>()(
    persist((set) => ({
        amount: "0",
        setAmount: (amount) => set((state) => ({ amount })),
    }))
);

export default useBuyAmountStore;
