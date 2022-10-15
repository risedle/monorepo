/*****************************************************************************
 * Default Box
 ****************************************************************************/

import React from "react";
import { describe, it, expect } from "vitest";
import { renderAsJSON } from "~/tests/lib";

import Box from "./index";

describe("Box", () => {
    it("Should render valid HTML element", () => {
        // Test default element
        const component = renderAsJSON(<Box>Hello</Box>);
        expect(component.type).toBe("div");
        expect(component.children?.[0]).toBe("Hello");
        expect(component.props["className"]).toBe(undefined);

        // Test custom element
        const elements = [
            "header",
            "footer",
            "nav",
            "section",
            "article",
            "main",
        ] as const;
        elements.forEach((element) => {
            const component = renderAsJSON(<Box as={element}>Hello</Box>);
            expect(component.type).toBe(element);
            expect(component.children?.[0]).toBe("Hello");
            expect(component.props["className"]).toBe(undefined);
        });
    });

    it("Should render valid HTML attributes", () => {
        const component = renderAsJSON(
            <Box as="a" href="/">
                Hello
            </Box>
        );
        expect(component.type).toBe("a");
        expect(component.children?.[0]).toBe("Hello");
        expect(component.props["className"]).toBe(undefined);
        expect(component.props["href"]).toBe("/");
    });

    it("Should accept ref as props", () => {
        const inputRef = React.createRef<HTMLInputElement>();
        let component = renderAsJSON(<Box as="input" ref={inputRef} />);
        expect(inputRef.current).toBe(null);
        expect(component.type).toBe("input");

        // @ts-expect-error Anchor should not accept ref to Input element
        component = renderAsJSON(<Box as="a" ref={inputRef} />);
        expect(inputRef.current).toBe(null);
        expect(component.type).toBe("a");
    });
});

//
///*****************************************************************************
// * Margin
// ****************************************************************************/
//
//describe("Margin", () => {
//    it("Should render correct class", () => {
//        // m="0"
//        let rendered = create(<Box m="0">Hello</Box>);
//        let component = rendered.toJSON();
//        expect(component.props["className"]).toBe("m-0");
//
//        // m="px"
//        rendered = create(<Box m="px">Hello</Box>);
//        component = rendered.toJSON();
//        expect(component.props["className"]).toBe("m-px");
//
//        // mx="4"
//        rendered = create(<Box mx="4">Hello</Box>);
//        component = rendered.toJSON();
//        expect(component.props["className"]).toBe("mx-4");
//
//        // m="14px"
//        rendered = create(<Box m="14px">Hello</Box>);
//        component = rendered.toJSON();
//        expect(component.props["className"]).toBe("m-[14px]");
//
//        // mt="md:4"
//        rendered = create(<Box mt="md:4">Hello</Box>);
//        component = rendered.toJSON();
//        expect(component.props["className"]).toBe("md:mt-4");
//
//        // my="4 sm:6 hover:md:14mx"
//        rendered = create(<Box my="4 sm:6 hover:md:14px">Hello</Box>);
//        component = rendered.toJSON();
//        expect(component.props["className"]).toBe(
//            "my-4 sm:my-6 hover:md:my-[14px]"
//        );
//
//        // mx="auto"
//        rendered = create(<Box mx="auto">Hello</Box>);
//        component = rendered.toJSON();
//        expect(component.props["className"]).toBe("mx-auto");
//    });
//});
