// Schema
import { Protocol } from "../../generated/schema";

// Math lib
import { ZERO_BD } from "../libs/math";

export function getOrCreateProtocol(
    name: string,
    slug: string,
    chainId: string,
    chainSlug: string,
    chainName: string
): Protocol {
    let protocol = Protocol.load("1");
    if (protocol === null) {
        protocol = new Protocol("1");
        protocol.name = name;
        protocol.slug = slug;
        protocol.chainId = chainId;
        protocol.chainSlug = chainSlug;
        protocol.chainName = chainName;
        protocol.save();
    }
    return protocol;
}
