/*****************************************************************************
 * Margin utility class
 *
 * Learn more:
 * https://tailwindcss.com/docs/margin
 ****************************************************************************/

import React from "react";
import { describe, it, expect } from "vitest";
import { renderAsJSON } from "~/tests/lib";

import Box from "../index";

describe("Margin", () => {
    it("Should render with className", () => {
        // m="0"
        let component = renderAsJSON(<Box m="0">Hello</Box>);
        expect(component.props["className"]).toBe("m-0");

        // mt="0"
        component = renderAsJSON(<Box mt="0">Hello</Box>);
        expect(component.props["className"]).toBe("mt-0");

        // mr="0"
        component = renderAsJSON(<Box mr="0">Hello</Box>);
        expect(component.props["className"]).toBe("mr-0");

        // mb="0"
        component = renderAsJSON(<Box mb="0">Hello</Box>);
        expect(component.props["className"]).toBe("mb-0");

        // ml="0"
        component = renderAsJSON(<Box ml="0">Hello</Box>);
        expect(component.props["className"]).toBe("ml-0");

        // m="px"
        component = renderAsJSON(<Box m="px">Hello</Box>);
        expect(component.props["className"]).toBe("m-px");

        // mx="4"
        component = renderAsJSON(<Box mx="4">Hello</Box>);
        expect(component.props["className"]).toBe("mx-4");

        // m="14px"
        component = renderAsJSON(<Box m="14px">Hello</Box>);
        expect(component.props["className"]).toBe("m-[14px]");

        // mt="md:4"
        component = renderAsJSON(<Box mt="md:4">Hello</Box>);
        expect(component.props["className"]).toBe("md:mt-4");

        // my="4 sm:6 hover:md:14px"
        component = renderAsJSON(<Box my="4 sm:6 hover:md:14px">Hello</Box>);
        expect(component.props["className"]).toBe(
            "my-4 sm:my-6 hover:md:my-[14px]"
        );
    });
});
