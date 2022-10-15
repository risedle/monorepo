import React from "react";
import { describe, it, expect } from "vitest";

import { renderAsJSON } from "~/tests/lib";

import Container from "./index";

describe("Container", () => {
    it("Should render with default class", () => {
        // Test default element
        const component = renderAsJSON(<Container>Hello</Container>);
        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "container mx-auto px-3 max-w-6xl"
        );
        expect(component.children?.[0]).toBe("Hello");
    });

    it("Should render with custom class", () => {
        const component = renderAsJSON(
            <Container px="16px" py="6">
                Hello
            </Container>
        );
        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "px-[16px] py-6 container mx-auto max-w-6xl"
        );
        expect(component.children?.[0]).toBe("Hello");
    });
});
