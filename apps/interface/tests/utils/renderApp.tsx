import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../utils/theme";

// Rainbowkit
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

// Rainbowkit configuration
const { chains, provider } = configureChains(
    [chain.arbitrum],
    [publicProvider()]
);

const wagmiClient = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
});

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ChakraProvider theme={theme}>
            <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
        </ChakraProvider>
    );
};

export const renderApp = (
    component: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => {
    return render(component, { wrapper: Wrapper, ...options });
};
