import React from "react";
import { describe, it, expect } from "vitest";
import { renderAsJSON } from "~/tests/lib";

import Link from "./index";

describe("Link", () => {
    it("Should render valid element", () => {
        let component = renderAsJSON(<Link>Hello</Link>);
        expect(component.type).toBe("a");
        expect(component.props["className"]).toBe(undefined);
        expect(component.props["href"]).toBe(undefined);
        expect(component.children?.[0]).toBe("Hello");

        component = renderAsJSON(<Link href="/">Hello</Link>);
        expect(component.type).toBe("a");
        expect(component.props["href"]).toBe("/");
        expect(component.props["className"]).toBe(undefined);
        expect(component.children?.[0]).toBe("Hello");

        component = renderAsJSON(
            <Link href="/">
                <p>Hello</p>
            </Link>
        );
        expect(component.type).toBe("a");
        expect(component.props["className"]).toBe(undefined);
        expect(component.props["href"]).toBe("/");
        const child = component.children?.pop()! as typeof component;
        expect(child.type).toBe("p");

        component = renderAsJSON(
            <Link href="/" title="myTitle" data-custom="myData">
                <p>Hello</p>
            </Link>
        );
        expect(component.type).toBe("a");
        expect(component.props["className"]).toBe(undefined);
        expect(component.props["href"]).toBe("/");
        expect(component.props["title"]).toBe("myTitle");
        expect(component.props["data-custom"]).toBe("myData");
    });
});
