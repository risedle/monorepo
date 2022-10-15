import React from "react";
import { describe, it, expect } from "vitest";
import { renderAsJSON } from "~/tests/lib";

import Box from "../index";

describe("Width", () => {
    it("Should render valid className", () => {
        const sizes = [
            "0",
            "px",
            "3",
            "1.5",
            "1/5",
            "auto",
            "full",
            "screen",
            "min",
            "max",
            "fit",
        ];
        for (const size of sizes) {
            const component = renderAsJSON(<Box w={size}>Hello</Box>);
            expect(component.props["className"]).toBe(`w-${size}`);
        }

        // States and breakpoints
        let component = renderAsJSON(
            <Box w="md:5 hover:1/4 lg:px">Hello</Box>
        );
        expect(component.props["className"]).toBe(
            "md:w-5 hover:w-1/4 lg:w-px"
        );

        // Arbitary values
        component = renderAsJSON(<Box w="md:12px lg:32rem">Hello</Box>);
        expect(component.props["className"]).toBe("md:w-[12px] lg:w-[32rem]");
    });
});

describe("Max Width", () => {
    it("Should render valid className", () => {
        const sizes = [
            "0",
            "none",
            "xs",
            "sm",
            "md",
            "lg",
            "xl",
            "2xl",
            "screen-md",
            "screen-2xl",
        ];
        for (const size of sizes) {
            const component = renderAsJSON(<Box maxW={size}>Hello</Box>);
            expect(component.props["className"]).toBe(`max-w-${size}`);
        }

        // States and breakpoints
        let component = renderAsJSON(
            <Box maxW="md:none hover:xl lg:screen-2xl">Hello</Box>
        );
        expect(component.props["className"]).toBe(
            "md:max-w-none hover:max-w-xl lg:max-w-screen-2xl"
        );

        // Arbitary values
        component = renderAsJSON(<Box maxW="md:12px lg:32rem">Hello</Box>);
        expect(component.props["className"]).toBe(
            "md:max-w-[12px] lg:max-w-[32rem]"
        );
    });
});
