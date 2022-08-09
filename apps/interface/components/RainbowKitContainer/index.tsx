import {
    RainbowKitProvider,
    lightTheme,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import { useColorMode } from "@chakra-ui/react";
import { useNetwork } from "wagmi";
import { ReactNode } from "react";

const RainbowKitContainer = ({ children }: { children: ReactNode }) => {
    const { chains } = useNetwork();
    const { colorMode } = useColorMode();
    return (
        <RainbowKitProvider
            theme={colorMode === "dark" ? darkTheme() : lightTheme()}
            chains={chains}
        >
            {children}
        </RainbowKitProvider>
    );
};

export default RainbowKitContainer;
