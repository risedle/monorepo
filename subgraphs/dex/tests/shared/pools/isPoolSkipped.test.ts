import { describe, test, assert } from "matchstick-as/assembly/index";

import { isPoolSkipped } from "../../../shared/pools";

describe("Given whitelisted tokens", () => {
    test("Should return True if none of tokens is whtestelisted", () => {
        const isSkipped = isPoolSkipped(["a", "b", "c"], ["d", "e"]);
        assert.assertTrue(isSkipped);
    });

    test("Should return False if one of the token is whtestelisted", () => {
        const isSkipped = isPoolSkipped(["a", "b", "c"], ["a", "e"]);
        assert.assertTrue(!isSkipped);
    });

    test("Should return False if both of the tokens are whtestelisted", () => {
        const isSkipped = isPoolSkipped(["a", "b", "c"], ["a", "b"]);
        assert.assertTrue(!isSkipped);
    });
});
