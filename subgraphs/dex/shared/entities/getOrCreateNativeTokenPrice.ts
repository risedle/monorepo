import { ethereum } from "@graphprotocol/graph-ts";

// Schema
import { Protocol, NativeTokenPrice } from "../../generated/schema";

// Price
import { getNativeTokenPriceUSD } from "../price";

// Get or create new NativeTokenPrice
export function getOrCreateNativeTokenPrice(
    protocol: Protocol,
    block: ethereum.Block
): NativeTokenPrice {
    let price = NativeTokenPrice.load(block.number.toString());
    if (price === null) {
        price = new NativeTokenPrice(block.number.toString());
        price.usd = getNativeTokenPriceUSD(protocol, block);
        price.timestamp = block.timestamp;
        price.protocol = protocol.id;
        price.save();
    }
    return price;
}
