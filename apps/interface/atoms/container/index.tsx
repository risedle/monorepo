/**
 * Container
 *
 * Containers are used to constrain a content's width to the current
 * breakpoint, while keeping it fluid.
 */
import React from "react";
import type { ReactNode } from "react";

import type { BoxProps } from "@/atoms/box";
import Box from "@/atoms/box";

const Container = (props: BoxProps) => {
    // Set container default value
    const newProps = { ...props };
    newProps["container"] = true;
    if (!newProps["mx"]) newProps["mx"] = "auto";
    if (!newProps["px"]) newProps["px"] = "3";
    if (!newProps["maxW"]) newProps["maxW"] = "6xl";

    return <Box {...newProps}>{props.children}</Box>;
};

export default Container;
