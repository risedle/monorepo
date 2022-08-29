import { log, Address, BigInt } from "@graphprotocol/graph-ts";

// Schema
import { Token, Protocol } from "../../generated/schema";

// Fetchs
import {
    fetchTokenName,
    fetchTokenSymbol,
    fetchTokenDecimals,
    fetchTokenTotalSupply,
} from "../token";

// Numerical constants
import { ZERO_BD, ZERO_BI } from "../libs/math";

// Chain and protocol info
import { CHAIN_ID } from "../../generated/protocol";

export function getOrCreateToken(
    tokenAddress: Address,
    protocol: Protocol
): Token {
    let token = Token.load(tokenAddress.toHexString());
    if (token === null) {
        token = new Token(tokenAddress.toHexString());

        token.name = fetchTokenName(CHAIN_ID, tokenAddress);
        token.symbol = fetchTokenSymbol(CHAIN_ID, tokenAddress);
        token.decimals = fetchTokenDecimals(CHAIN_ID, tokenAddress);

        token.cumulativeVolumeUSD = ZERO_BD;
        token.latestPriceETH = ZERO_BD;
        token.latestPriceETHBlockNumber = ZERO_BI;
        token.latestMarketCapETH = ZERO_BD;
        token.totalValueLockedUSD = ZERO_BD;
        token.totalLiquidityPoolCount = 0;
        token.protocol = protocol.id;

        token.save();
    }
    return token;
}
