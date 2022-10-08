/**
 * Text
 *
 * A primitive typographic component
 */
import React from "react";

export interface TextProps {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label" | "p" | "span";
    children?: string;
}

const Text = (props: TextProps) => {
    const { as, children } = props;

    // Use <p> by default
    let element = as;
    if (element == null) element = "p";

    // Build atrributes
    const attrs = {};
    attrs["data-atom"] = "Text";

    return React.createElement(element, attrs, children);
};

export default Text;
