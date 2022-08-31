import { Address } from "@graphprotocol/graph-ts";

// Schema
import { Protocol, Token } from "../../generated/schema";

// Fetchs
import {
    fetchTokenName,
    fetchTokenSymbol,
    fetchTokenDecimals,
} from "../token";

// Chain and protocol info
import { CHAIN_ID } from "../../generated/protocol";

// Get or create new Token
export function getOrCreateToken(
    protocol: Protocol,
    tokenAddress: Address
): Token {
    let token = Token.load(tokenAddress.toHexString());
    if (token == null) {
        token = new Token(tokenAddress.toHexString());
        token.name = fetchTokenName(CHAIN_ID, tokenAddress);
        token.symbol = fetchTokenSymbol(CHAIN_ID, tokenAddress);
        token.decimals = fetchTokenDecimals(CHAIN_ID, tokenAddress);
        token.protocol = protocol.id;
        token.save();
    }
    return token;
}
