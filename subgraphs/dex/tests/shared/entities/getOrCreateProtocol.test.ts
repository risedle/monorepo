import {
    describe,
    test,
    assert,
    beforeEach,
} from "matchstick-as/assembly/index";

// Schema
import { Protocol } from "../../../generated/schema";

// Protocol constant
import {
    NAME,
    SLUG,
    CHAIN_ID,
    CHAIN_SLUG,
    CHAIN_NAME,
} from "../../../generated/protocol";

import { getOrCreateProtocol } from "../../../shared/entities";

describe("getOrCreateProtocol", () => {
    test("Should create new protocol", () => {
        getOrCreateProtocol();

        // Load the Protocol
        let protocol = Protocol.load("1")!;

        // Check the values
        assert.stringEquals(protocol.name, NAME);
        assert.stringEquals(protocol.slug, SLUG);
        assert.stringEquals(protocol.chainId, CHAIN_ID);
        assert.stringEquals(protocol.chainSlug, CHAIN_SLUG);
        assert.stringEquals(protocol.chainName, CHAIN_NAME);
    });
});
