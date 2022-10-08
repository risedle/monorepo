/**
 * Flexbox Item
 *
 * The Flexbox (Flexible Box) Layout aims at providing a more efficient
 * way to lay out, align and distribute space among items in a container,
 * even when their size is unknown and/or dynamic (thus the word “flex”).
 *
 * <FlexItem /> component is the child element (flex item) of <Flex />.
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

export interface FlexItemProps {
    as?: DivElement | ContentSectioningElements | ListElements;
    children?: ReactNode;
}

const FlexItem = (props: FlexItemProps) => {
    const { as, children } = props;

    // Use <div> by default
    let element = as;
    if (element == null) element = "div";

    // Build atrributes
    const attrs: AtomDataAttributes = {};
    attrs["data-atom"] = "FlexItem";

    return React.createElement(element, attrs, children);
};

export default FlexItem;
