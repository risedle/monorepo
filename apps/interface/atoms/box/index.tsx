/**
 * Box Component
 *
 * Box Component is the baseline of all components.
 */
import React from "react";
import type { ReactNode } from "react";

// Types
export interface BoxProps {
    as?: keyof HTMLElementTagNameMap;
    children?: ReactNode;
    [key: string]: any;
}

// This is list of props that takes value either bool or breakpoint
const boolOrBreakpointProps = ["container", "flex"];
const derivativeProps: { [key: string]: string } = {
    direction: "flex",
    maxW: "max-w",
};

/*****************************************************************************
 * CSS Units
 ****************************************************************************/
const absoluteUnits = ["cm", "mm", "Q", "in", "pc", "pt", "px"];
const relativeUnits = [
    "em",
    "ex",
    "ch",
    "rem",
    "lh",
    "rlh",
    "vw",
    "vh",
    "vmin",
    "vmax",
    "vb",
    "vi",
    "svw",
    "svh",
    "lvw",
    "lvh",
    "dvw",
    "dvh",
];
const percentageUnits = ["%"];
const colorUnits = ["#", "rgb", "hsl"];
const imageUnits = ["url"];
const cssUnits = absoluteUnits
    .concat(relativeUnits)
    .concat(percentageUnits)
    .concat(colorUnits)
    .concat(imageUnits);

/*****************************************************************************
 * Props value to class name converter
 ****************************************************************************/
/**
 * propsValueToClass transform props (key,value) to class name.
 *
 * For example:
 * ("container", "md")
 * ("px", "4 md:5") -> "px-4 md:px-5"
 */
const propsValueToClass = (key: string, value: string): string => {
    const inputs = value.split(" ");
    const outputs = [];
    for (const input of inputs) {
        const prefixes = input.split(":");
        const lastValue = prefixes.pop();
        if (!lastValue) continue;
        const unit = cssUnits.find((unit) => lastValue.includes(unit));
        const prefix = prefixes.join(":");

        // Treat string that have css units as arbitary value
        if (unit && unit != lastValue) {
            if (prefix != "") {
                outputs.push(`${prefix}:${key}-[${lastValue}]`);
            } else {
                outputs.push(`${key}-[${lastValue}]`);
            }
        } else {
            // Otherwise use the value directly
            if (prefix != "") {
                outputs.push(`${prefix}:${key}-${lastValue}`);
            } else {
                outputs.push(`${key}-${lastValue}`);
            }
        }
    }
    return outputs.join(" ");
};

/*****************************************************************************
 * Gedebox pisang
 ****************************************************************************/
const Box = (props: BoxProps) => {
    const { as, children } = props;

    // Use <div> by default
    let element = as;
    if (element == null) element = "div";

    // Build the className props
    const classNames = [];
    for (const [key, value] of Object.entries(props)) {
        // Skip 'as' and 'children' props
        if (["as", "children"].includes(key)) continue;

        // Handle bool or breakpoint props.
        // Examples: container -> container, container="md" -> md:container
        if (boolOrBreakpointProps.includes(key)) {
            if (typeof value == "boolean") {
                classNames.push(key);
                continue;
            }
            if (typeof value == "string") {
                classNames.push(`${value}:${key}`);
                continue;
            }
        }

        // Handle derivative props (e.g. direction='row' -> flex-row)
        if (Object.keys(derivativeProps).includes(key)) {
            const className = propsValueToClass(derivativeProps[key], value);
            classNames.push(className);
            continue;
        }

        // Handle direct props.
        // Examples: px="14px" -> px-[14px], mx="auto" ->  mx-auto
        const className = propsValueToClass(key, value);
        classNames.push(className);
    }

    // Set the className props
    const attrs: { [key: string]: string } = {};
    const className = classNames.join(" ");
    if (className != "") attrs["className"] = className;

    return React.createElement(element, attrs, children);
};

export default Box;
