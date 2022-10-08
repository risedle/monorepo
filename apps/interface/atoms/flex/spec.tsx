import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

// Types

import Flex from "./index";

describe("Given 'as' prop", () => {
    it("Should render correct HTML element", () => {
        // Test default element
        const rendered = create(<Flex>Hello</Flex>);
        const component = rendered.toJSON();

        expect(component.type).toBe("div");
        expect(component.props["data-atom"]).toBe("Flex");
        expect(component.children[0]).toBe("Hello");

        // Test custom element
        const elements = [
            "header",
            "footer",
            "nav",
            "section",
            "article",
            "main",
        ];
        elements.forEach((element) => {
            const rendered = create(<Flex as={element}>Hello</Flex>);
            const component = rendered.toJSON();

            expect(component.type).toBe(element);
            expect(component.props["data-atom"]).toBe("Flex");
            expect(component.children[0]).toBe("Hello");
        });
    });
});
