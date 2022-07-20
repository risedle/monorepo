import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../utils/theme";

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export const chakraRender = (
    component: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => {
    return render(component, { wrapper: Wrapper, ...options });
};
