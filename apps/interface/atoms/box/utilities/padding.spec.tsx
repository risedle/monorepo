/*****************************************************************************
 * Padding utility class
 *
 * Learn more:
 * https://tailwindcss.com/docs/padding
 ****************************************************************************/

import React from "react";
import { describe, it, expect } from "vitest";
import { renderAsJSON } from "~/tests/lib";

import Box from "../index";

describe("Padding", () => {
    it("Should render with className", () => {
        // p="0"
        let component = renderAsJSON(<Box p="0">Hello</Box>);
        expect(component.props["className"]).toBe("p-0");

        // pt="0"
        component = renderAsJSON(<Box pt="0">Hello</Box>);
        expect(component.props["className"]).toBe("pt-0");

        // pr="0"
        component = renderAsJSON(<Box pr="0">Hello</Box>);
        expect(component.props["className"]).toBe("pr-0");

        // pb="0"
        component = renderAsJSON(<Box pb="0">Hello</Box>);
        expect(component.props["className"]).toBe("pb-0");

        // pl="0"
        component = renderAsJSON(<Box pl="0">Hello</Box>);
        expect(component.props["className"]).toBe("pl-0");

        // p="px"
        component = renderAsJSON(<Box p="px">Hello</Box>);
        expect(component.props["className"]).toBe("p-px");

        // px="4"
        component = renderAsJSON(<Box px="4">Hello</Box>);
        expect(component.props["className"]).toBe("px-4");

        // p="14px"
        component = renderAsJSON(<Box p="14px">Hello</Box>);
        expect(component.props["className"]).toBe("p-[14px]");

        // pt="md:4"
        component = renderAsJSON(<Box pt="md:4">Hello</Box>);
        expect(component.props["className"]).toBe("md:pt-4");

        // py="4 sm:6 hover:md:14px"
        component = renderAsJSON(<Box py="4 sm:6 hover:md:14px">Hello</Box>);
        expect(component.props["className"]).toBe(
            "py-4 sm:py-6 hover:md:py-[14px]"
        );
    });
});
