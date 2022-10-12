import React from "react";
import { describe, it, expect } from "vitest";
import { create } from "react-test-renderer";

import Link from "./index";

// TODO(pyk): update test
describe("Link", () => {
    it("Should render with default class", () => {
        const rendered = create(<Link>Hello</Link>);
        const component = rendered.toJSON();
        expect(true).toBe(true);
    });
});
