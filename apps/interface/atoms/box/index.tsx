/*****************************************************************************
 * Box is a primitive for consuming TailwindCSS utility class.
 ****************************************************************************/
import React from "react";

import type { UtilityProps } from "./utilities";
import { isUtilityProps, cls } from "./utilities";

export type AsProps<T extends React.ElementType = React.ElementType> = {
    as?: T;
};

export type NativeProps<T extends React.ElementType> = AsProps<T> &
    Omit<React.ComponentProps<T>, keyof AsProps | "className">;

const defaultElement = "div";

const Box: <T extends React.ElementType = typeof defaultElement>(
    props: NativeProps<T> & UtilityProps
) => React.ReactElement | null = React.forwardRef(function Box(
    props: AsProps,
    ref: React.Ref<Element>
) {
    const nativeProps: Record<string, unknown> = {};
    const utilityProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
        if (isUtilityProps(key)) {
            utilityProps[key] = value;
        } else {
            nativeProps[key] = value;
        }
    }
    const Element = props.as || defaultElement;
    return (
        <Element ref={ref} className={cls(utilityProps)} {...nativeProps} />
    );
});

export default Box;
