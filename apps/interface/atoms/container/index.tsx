/**
 * Container
 *
 * Containers are used to constrain a content's width to the current
 * breakpoint, while keeping it fluid.
 */
import React from "react";

import type { UtilityProps } from "~/atoms/box/utilities";
import type { NativeProps } from "~/atoms/box";
import Box from "~/atoms/box";

export default function Container<T extends React.ElementType = "div">({
    mx,
    px,
    maxW,
    children,
    ...props
}: NativeProps<T> & Omit<UtilityProps, "container">) {
    return (
        <Box
            container
            mx={mx ? mx : "auto"}
            px={px ? px : "3"}
            maxW={maxW ? maxW : "6xl"}
            {...props}
        />
    );
}
