/**
 * Container
 *
 * Containers are used to constrain a content's width to the current
 * breakpoint, while keeping it fluid.
 */
import React from "react";
import type { ReactNode } from "react";

// Styles
import "./style.css";

// Types
import type {
    DivElement,
    ContentSectioningElements,
    AtomDataAttributes,
} from "@/atoms/lib";

export interface ContainerProps {
    as?: DivElement | ContentSectioningElements;
    children?: ReactNode;
}

const Container = (props: ContainerProps) => {
    const { as, children } = props;

    // Use <div> by default
    let element = as;
    if (element == null) element = "div";

    // Build atrributes
    const attrs: AtomDataAttributes = {};
    attrs["data-atom"] = "Container";

    return React.createElement(element, attrs, children);
};

export default Container;
