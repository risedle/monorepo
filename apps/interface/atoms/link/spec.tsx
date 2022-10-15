import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

import Link from "./index";

describe("Link", () => {
    it("Should render with default HTML tag", () => {
        const rendered = create(<Link>Hello</Link>);
        const component = rendered.toJSON();
        expect(component.type).toBe("a");
        expect(Object.keys(component.props).length).toBe(0);
        expect(component.children[0]).toBe("Hello");
    });

    it("Should render with custom href", () => {
        const rendered = create(<Link href="/">Hello</Link>);
        const component = rendered.toJSON();
        console.log(component);
        expect(component.type).toBe("a");
        expect(component.props.href).toBe("/");
        expect(component.children[0]).toBe("Hello");
    });
});
