/**
 * Flex
 *
 * The Flexbox (Flexible Box) Layout aims at providing a more efficient
 * way to lay out, align and distribute space among items in a container,
 * even when their size is unknown and/or dynamic (thus the word “flex”).
 *
 * <Flex /> component is a parent element or the flex container.
 *
 * Resources:
 * https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
import React from "react";
import type { ReactNode } from "react";

// Types
import type {
    DivElement,
    ContentSectioningElements,
    ListElements,
    AtomDataAttributes,
} from "@/atoms/lib";
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type JustifyContent =
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly";

// Styles
import "./style.css";

export interface FlexProps {
    as?: DivElement | ContentSectioningElements | ListElements;
    direction?: FlexDirection;
    justify?: JustifyContent;
    children?: ReactNode;
}

const Flex = (props: FlexProps) => {
    const { as, direction, justify, children } = props;

    // Use <div> by default
    let element = as;
    if (element == null) element = "div";

    // Build atrributes
    const attrs: AtomDataAttributes = {};
    attrs["data-atom"] = "Flex";
    if (direction) attrs["data-direction"] = direction;
    if (justify) attrs["data-justify"] = justify;

    return React.createElement(element, attrs, children);
};

export default Flex;
