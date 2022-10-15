import React from "react";
import { describe, it, expect } from "vitest";
import { renderAsJSON } from "~/tests/lib";

import Flex from "./index";

describe("Flex", () => {
    it("Should render with default class", () => {
        const component = renderAsJSON(<Flex>Hello</Flex>);
        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "flex flex-row justify-start"
        );
        expect(component.children?.[0]).toBe("Hello");
    });

    it("Should render with custom class", () => {
        const component = renderAsJSON(
            <Flex direction="col" py="6">
                Hello
            </Flex>
        );
        expect(component.type).toBe("div");
        expect(component.props["className"]).toBe(
            "flex-col py-6 flex justify-start"
        );
        expect(component.children?.[0]).toBe("Hello");
    });
});
