/**
 * Box Component
 *
 * Box Component is the baseline of all components.
 */
import React from "react";
import type { ReactNode } from "react";

// Types
import type { DivElement, ContentSectioningElements } from "@/atoms/lib";

export interface BoxProps {
    as?: DivElement | ContentSectioningElements;
    children?: ReactNode;

    // Container
    container?: boolean;

    /*************************************************************************
     * Spacing
     ************************************************************************/

    // Padding
    p?: string;
    pt?: string;
    pr?: string;
    pb?: string;
    pl?: string;
    px?: string;
    py?: string;

    // Margin
    m?: string;
    mt?: string;
    mr?: string;
    mb?: string;
    ml?: string;
    mx?: string;
    my?: string;

    /*************************************************************************
     * Sizing
     ************************************************************************/
    maxW: string;
}

const boolProps = ["container"];

// Convert key props and value to class name
const paddingProps = ["p", "pt", "pr", "pb", "pl", "px", "py"];
const marginProps = ["m", "mt", "mr", "mb", "ml", "mx", "my"];
const predefinedUnits = [
    "auto",
    "none",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "full",
    "min",
    "max",
    "fit",
    "prose",
    "screen-sm",
    "screen-md",
    "screen-lg",
    "screen-xl",
    "screen-2xl",
];

const propsToClass = (key: string, size: string): string => {
    // Handle multiple modifiers (e.g. px="4 darkmode:md:14px")
    const modifiers = size.split(" ");
    const results = [];
    for (const modifier of modifiers) {
        // Handle predefined units
        if (predefinedUnits.includes(modifier)) {
            results.push(`${key}-${modifier}`);
            continue;
        }

        // either pre-defined (4) or custom value (14px)
        if (!modifier.includes(":")) {
            if (!isNaN(modifier)) {
                results.push(`${key}-${modifier}`);
                continue;
            } else {
                results.push(`${key}-[${modifier}]`);
                continue;
            }
        }

        // Handle modifier: md:4, darkmode:md:4 and so on
        // Convert to md:px-4, darkmode:md:px-4 and so on
        const prefixes = modifier.split(":");
        const lastValue = prefixes.pop();
        // ['darkmode', 'md'] -> "darkmode:md"
        if (prefixes.length >= 1) {
            const prefix = prefixes.join(":");
            if (!isNaN(lastValue)) {
                results.push(`${prefix}:${key}-${lastValue}`);
                continue;
            } else {
                results.push(`${prefix}:${key}-[${lastValue}]`);
                continue;
            }
        } else {
            if (!isNaN(lastValue)) {
                results.push(`${key}-${lastValue}`);
                continue;
            } else {
                results.push(`${key}-[${lastValue}]`);
                continue;
            }
        }
    }
    return results.join(" ");
};

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
        if (boolProps.includes(key)) {
            classNames.push(key);
        }
        if (marginProps.includes(key)) {
            const className = propsToClass(key, value.trim());
            classNames.push(className);
            continue;
        }
        if (paddingProps.includes(key)) {
            const className = propsToClass(key, value.trim());
            classNames.push(className);
            continue;
        }
        if (key == "maxW") {
            const className = propsToClass("max-w", value.trim());
            classNames.push(className);
            continue;
        }
    }

    // Set the className props
    const attrs = {};
    const className = classNames.join(" ");
    if (className != "") attrs["className"] = className;

    return React.createElement(element, attrs, children);
};

export default Box;
