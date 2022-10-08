import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

import Text from "./index";

describe("Given 'as' prop", () => {
    it("Should render correct HTML element", () => {
        // Test default element
        const rendered = create(<Text>Hello</Text>);
        const component = rendered.toJSON();

        expect(component.type).toBe("p");
        expect(component.props["data-atom"]).toBe("Text");
        expect(component.children[0]).toBe("Hello");

        // Test custom element
        const elements = [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "label",
            "span",
            "p",
        ];
        elements.forEach((element) => {
            const rendered = create(<Text as={element}>Hello</Text>);
            const component = rendered.toJSON();

            expect(component.type).toBe(element);
            expect(component.props["data-atom"]).toBe("Text");
            expect(component.children[0]).toBe("Hello");
        });
    });
});
