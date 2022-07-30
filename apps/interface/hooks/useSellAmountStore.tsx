import create from "zustand";

interface SellAmountState {
    amount: string;
    setAmount: (amount: string) => void;
}

export const useSellAmountStore = create<SellAmountState>()((set) => ({
    amount: "", // Set to empty string to display the placeholder form
    setAmount: (amount) => set((state) => ({ amount })),
}));

export default useSellAmountStore;
