import { Address, BigInt } from "@graphprotocol/graph-ts";

// Schema
import { Token } from "../../generated/schema";

export function loadOrCreateToken(tokenAddress: Address): Token {
    let token = Token.load(FACTORY_ADDRESS);
}
