import create from "zustand";
import { persist } from "zustand/middleware";

interface BuyAmountState {
    amount: string;
    setAmount: (amount: string) => void;
}

export const useBuyAmountStore = create<BuyAmountState>()(
    persist((set) => ({
        amount: "", // Set to empty string to display the placeholder form
        setAmount: (amount) => set((state) => ({ amount })),
    }))
);

export default useBuyAmountStore;
