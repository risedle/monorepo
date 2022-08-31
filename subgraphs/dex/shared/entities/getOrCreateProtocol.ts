// Schema
import { Protocol } from "../../generated/schema";

// Protocol constant
import {
    NAME,
    SLUG,
    CHAIN_ID,
    CHAIN_SLUG,
    CHAIN_NAME,
} from "../../generated/protocol";

// Get or create new Protocol
export function getOrCreateProtocol(): Protocol {
    let protocol = Protocol.load("1");
    if (protocol === null) {
        protocol = new Protocol("1");
        protocol.name = NAME;
        protocol.slug = SLUG;
        protocol.chainId = CHAIN_ID;
        protocol.chainSlug = CHAIN_SLUG;
        protocol.chainName = CHAIN_NAME;
        protocol.save();
    }
    return protocol;
}
