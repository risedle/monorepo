import create from "zustand";

type Theme = "light" | "dark";

type ThemeStore = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const useChakraThemeStore = create<ThemeStore>((set) => ({
    theme: "dark",
    setTheme: (theme) => set({ theme }),
}));
