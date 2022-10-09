import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

import Container from "./index";

describe("Given 'as' prop", () => {
    it("Should render correct HTML element", () => {
        // Test default element
        const rendered = create(<Container>Hello</Container>);
        const component = rendered.toJSON();

        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "container mx-auto px-3 max-w-6xl"
        );
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
            const rendered = create(<Container as={element}>Hello</Container>);
            const component = rendered.toJSON();

            expect(component.type).toBe(element);
            expect(component.props["className"]).toBe(
                "container mx-auto px-3 max-w-6xl"
            );
            expect(component.children[0]).toBe("Hello");
        });
    });
});
