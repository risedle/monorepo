/**
 * Flex
 *
 * The Flexbox (Flexible Box) Layout aims at providing a more efficient
 * way to lay out, align and distribute space among items in a container,
 * even when their size is unknown and/or dynamic (thus the word “flex”).
 *
 * <Flex /> component is a parent element or the flex container.
 *
 * See Flex parent element visualization here:
 * https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
import React from "react";
import type { ReactNode } from "react";

import type { BoxProps } from "@/atoms/box";
import Box from "@/atoms/box";

const Flex = (props: BoxProps) => {
    // Set container default value
    const newProps = { ...props };
    newProps["flex"] = true;
    if (!newProps["direction"]) newProps["direction"] = "row";
    if (!newProps["justify"]) newProps["justify"] = "start";

    return <Box {...newProps}>{props.children}</Box>;
};

export default Flex;
