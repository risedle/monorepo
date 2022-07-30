import create from "zustand";

interface BuyAmountState {
    amount: string;
    setAmount: (amount: string) => void;
}

export const useBuyAmountStore = create<BuyAmountState>()((set) => ({
    amount: "", // Set to empty string to display the placeholder form
    setAmount: (amount) => set((state) => ({ amount })),
}));

export default useBuyAmountStore;
