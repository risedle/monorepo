/*****************************************************************************
 * `container` utility class
 *
 * Learn more:
 * https://tailwindcss.com/docs/container
 ****************************************************************************/

import React from "react";
import { describe, it, expect } from "vitest";
import { renderAsJSON } from "~/tests/lib";

import Box from "../index";

describe("Container", () => {
    it("Should render with className", () => {
        // container
        let component = renderAsJSON(<Box container>Hello</Box>);
        expect(component.props["className"]).toBe("container");
        expect(component.children?.[0]).toBe("Hello");

        component = renderAsJSON(<Box container={false}>Hello</Box>);
        expect(component.props["className"]).toBe(undefined);
        expect(component.children?.[0]).toBe("Hello");

        // container="md"
        const breakpoints = ["sm", "md", "tablet", "laptop"];
        for (const breakpoint of breakpoints) {
            component = renderAsJSON(<Box container={breakpoint}>Hello</Box>);
            expect(component.props["className"]).toBe(
                `${breakpoint}:container`
            );
            expect(component.children?.[0]).toBe("Hello");
        }
    });
});
