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

import type { UtilityProps } from "~/atoms/box/utilities";
import type { NativeProps } from "~/atoms/box";
import Box from "~/atoms/box";

export default function Flex<T extends React.ElementType = "div">({
    direction,
    justify,
    ...props
}: NativeProps<T> & Omit<UtilityProps, "flex">) {
    return (
        <Box
            flex
            direction={direction ? direction : "row"}
            justify={justify ? justify : "start"}
            {...props}
        />
    );
}
