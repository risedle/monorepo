import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

import Box from "./index";

/*****************************************************************************
 * Default Box
 ****************************************************************************/

describe("Box", () => {
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

/*****************************************************************************
 * Container
 ****************************************************************************/

describe("Container", () => {
    it("Should render correct class", () => {
        // container
        let rendered = create(<Box container>Hello</Box>);
        let component = rendered.toJSON();
        expect(component.props["className"]).toBe("container");
        expect(component.children[0]).toBe("Hello");

        // container="md"
        const breakpoints = ["sm", "md", "tablet", "laptop"];
        for (const breakpoint of breakpoints) {
            rendered = create(<Box container={breakpoint}>Hello</Box>);
            component = rendered.toJSON();
            expect(component.props["className"]).toBe(
                `${breakpoint}:container`
            );
            expect(component.children[0]).toBe("Hello");
        }
    });
});

/*****************************************************************************
 * Flexible Box (Flexbox)
 ****************************************************************************/

describe("Flexbox", () => {
    it("Should render correct class", () => {
        // flex
        let rendered = create(<Box flex>Hello</Box>);
        let component = rendered.toJSON();
        expect(component.props["className"]).toBe("flex");
        expect(component.children[0]).toBe("Hello");

        // flex="md"
        const breakpoints = ["sm", "md", "tablet", "laptop"];
        for (const breakpoint of breakpoints) {
            rendered = create(<Box flex={breakpoint}>Hello</Box>);
            component = rendered.toJSON();
            expect(component.props["className"]).toBe(`${breakpoint}:flex`);
            expect(component.children[0]).toBe("Hello");
        }

        // flex direction='row'
        const directions = ["row", "row-reverse", "col", "col-reverse"];
        for (const direction of directions) {
            rendered = create(
                <Box flex direction={direction}>
                    Hello
                </Box>
            );
            component = rendered.toJSON();
            expect(component.props["className"]).toBe(
                `flex flex-${direction}`
            );
        }

        // flex direction="sm:row lg:col"
        rendered = create(
            <Box flex direction="sm:row lg:col">
                Hello
            </Box>
        );
        component = rendered.toJSON();
        expect(component.props["className"]).toBe(
            "flex sm:flex-row lg:flex-col"
        );

        // flex direction="row" justify="start"
        rendered = create(
            <Box flex direction="row" justify="start">
                Hello
            </Box>
        );
        component = rendered.toJSON();
        expect(component.props["className"]).toBe(
            "flex flex-row justify-start"
        );
    });
});

/*****************************************************************************
 * Padding
 ****************************************************************************/

describe("Padding", () => {
    it("Should render correct class", () => {
        // p="0"
        let rendered = create(<Box p="0">Hello</Box>);
        let component = rendered.toJSON();
        expect(component.props["className"]).toBe("p-0");

        // p="px"
        rendered = create(<Box p="px">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("p-px");

        // px="4"
        rendered = create(<Box px="4">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("px-4");

        // p="14px"
        rendered = create(<Box p="14px">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("p-[14px]");

        // pt="md:4"
        rendered = create(<Box pt="md:4">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("md:pt-4");

        // py="4 sm:6 hover:md:14px"
        rendered = create(<Box py="4 sm:6 hover:md:14px">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe(
            "py-4 sm:py-6 hover:md:py-[14px]"
        );
    });
});

/*****************************************************************************
 * Margin
 ****************************************************************************/

describe("Margin", () => {
    it("Should render correct class", () => {
        // m="0"
        let rendered = create(<Box m="0">Hello</Box>);
        let component = rendered.toJSON();
        expect(component.props["className"]).toBe("m-0");

        // m="px"
        rendered = create(<Box m="px">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("m-px");

        // mx="4"
        rendered = create(<Box mx="4">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("mx-4");

        // m="14px"
        rendered = create(<Box m="14px">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("m-[14px]");

        // mt="md:4"
        rendered = create(<Box mt="md:4">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("md:mt-4");

        // my="4 sm:6 hover:md:14mx"
        rendered = create(<Box my="4 sm:6 hover:md:14px">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe(
            "my-4 sm:my-6 hover:md:my-[14px]"
        );

        // mx="auto"
        rendered = create(<Box mx="auto">Hello</Box>);
        component = rendered.toJSON();
        expect(component.props["className"]).toBe("mx-auto");
    });
});
