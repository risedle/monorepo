/*****************************************************************************
 * Test Libs
 *
 * Commonly used functions for testing
 ****************************************************************************/

import type { ReactElement } from "react";
import type { ReactTestRendererJSON } from "react-test-renderer";
import { create } from "react-test-renderer";

/**
 * Given React element, returns the JSON representation of the component.
 *
 * More info:
 * https://reactjs.org/docs/test-renderer.html#testrenderertojson
 **/
export function renderAsJSON(element: ReactElement): ReactTestRendererJSON {
    const rendered = create(element);
    const component = rendered.toJSON()!;
    if (Array.isArray(component)) {
        throw new Error("Component should not be array");
    }
    return component;
}
