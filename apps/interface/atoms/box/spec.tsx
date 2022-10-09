import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

import Box from "./index";

describe("Given 'as' prop", () => {
    it("Should render correct HTML element", () => {
        // Test default element
        const rendered = create(<Box>Hello</Box>);
        const component = rendered.toJSON();

        expect(component.type).toBe("div");
        expect(component.children[0]).toBe("Hello");
        expect(component.props["className"]).toBe(undefined);

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
            const rendered = create(<Box as={element}>Hello</Box>);
            const component = rendered.toJSON();

            expect(component.type).toBe(element);
            expect(component.children[0]).toBe("Hello");
            expect(component.props["className"]).toBe(undefined);
        });
    });
});

describe("Given container properties", () => {
    it("Should render class='container'", () => {
        const rendered = create(<Box container>Hello</Box>);
        const component = rendered.toJSON();
        expect(component.props["className"]).toBe("container");
    });
});

describe("Given padding properties", () => {
    describe("Given px='4'", () => {
        it("Should render class='px-4'", () => {
            const rendered = create(<Box px="4">Hello</Box>);
            const component = rendered.toJSON();
            expect(component.props["className"]).toBe("px-4");
        });
    });

    describe("Given p='14px'", () => {
        it("Should render class='p-[14px]'", () => {
            const rendered = create(<Box p="14px">Hello</Box>);
            const component = rendered.toJSON();
            expect(component.props["className"]).toBe("p-[14px]");
        });
    });

    describe("Given pt='md:4'", () => {
        it("Should render class='md:pt-4'", () => {
            const rendered = create(<Box pt="md:4">Hello</Box>);
            const component = rendered.toJSON();
            expect(component.props["className"]).toBe("md:pt-4");
        });
    });

    describe("Given py='4 sm:6 hover:md:14px'", () => {
        it("Should render class='py-4 sm:py-6 hover:md:py-[14px]'", () => {
            const rendered = create(
                <Box py="4 sm:6 hover:md:14px">Hello</Box>
            );
            const component = rendered.toJSON();
            expect(component.props["className"]).toBe(
                "py-4 sm:py-6 hover:md:py-[14px]"
            );
        });
    });
});
