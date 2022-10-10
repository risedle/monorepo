import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

import Flex from "./index";

describe("Flex", () => {
    it("Should render with default class", () => {
        // Test default element
        const rendered = create(<Flex>Hello</Flex>);
        const component = rendered.toJSON();

        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "flex flex-row justify-start"
        );
        expect(component.children[0]).toBe("Hello");
    });

    it("Should render with custom class", () => {
        // Test default element
        const rendered = create(
            <Flex direction="col" py="6">
                Hello
            </Flex>
        );
        const component = rendered.toJSON();

        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "flex-col py-6 flex justify-start"
        );
        expect(component.children[0]).toBe("Hello");
    });
});
