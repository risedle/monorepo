/*****************************************************************************
 * Flexible Box (Flexbox)
 *
 * `flex` and related utility classes.
 *
 * Learn more:
 * https://tailwindcss.com/docs/flex
 ****************************************************************************/

import React from "react";
import { describe, it, expect } from "vitest";
import { renderAsJSON } from "~/tests/lib";

import Box from "../index";

describe("Flexbox", () => {
    it("Should render with className", () => {
        // flex
        let component = renderAsJSON(<Box flex>Hello</Box>);
        expect(component.props["className"]).toBe("flex");
        expect(component.children?.[0]).toBe("Hello");

        component = renderAsJSON(<Box flex={false}>Hello</Box>);
        expect(component.props["className"]).toBe(undefined);
        expect(component.children?.[0]).toBe("Hello");

        // flex="md"
        const breakpoints = ["sm", "md", "tablet", "laptop"];
        for (const breakpoint of breakpoints) {
            component = renderAsJSON(<Box flex={breakpoint}>Hello</Box>);
            expect(component.props["className"]).toBe(`${breakpoint}:flex`);
            expect(component.children?.[0]).toBe("Hello");
        }

        // flex direction='row'
        const directions = ["row", "row-reverse", "col", "col-reverse"];
        for (const direction of directions) {
            component = renderAsJSON(
                <Box flex direction={direction}>
                    Hello
                </Box>
            );
            expect(component.props["className"]).toBe(
                `flex flex-${direction}`
            );
        }

        // flex direction="sm:row lg:col"
        component = renderAsJSON(
            <Box flex direction="sm:row lg:col">
                Hello
            </Box>
        );
        expect(component.props["className"]).toBe(
            "flex sm:flex-row lg:flex-col"
        );

        // flex direction="row" justify="start"
        component = renderAsJSON(
            <Box flex direction="row" justify="start">
                Hello
            </Box>
        );
        expect(component.props["className"]).toBe(
            "flex flex-row justify-start"
        );
    });
});
