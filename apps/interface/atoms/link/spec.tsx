import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

import Link from "./index";

describe("Link", () => {
    it("Should render with default class", () => {
        // Test default element
        const rendered = create(<Link>Hello</Link>);
        const component = rendered.toJSON();

        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "container mx-auto px-3 max-w-6xl"
        );
        expect(component.children[0]).toBe("Hello");
    });

    it("Should render with custom class", () => {
        // Test default element
        const rendered = create(
            <Container px="16px" py="6">
                Hello
            </Container>
        );
        const component = rendered.toJSON();

        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "px-[16px] py-6 container mx-auto max-w-6xl"
        );
        expect(component.children[0]).toBe("Hello");
    });
});
