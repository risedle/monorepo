import {
    describe,
    test,
    assert,
    beforeEach,
} from "matchstick-as/assembly/index";
import { logStore, clearStore } from "matchstick-as/assembly/store";
import { Address, BigInt } from "@graphprotocol/graph-ts";

// Schema
import { Protocol, Token } from "../../generated/schema";

// Handler
import { handlePoolCreated } from "../../protocols/uniswap-v3/handlers/handlePoolCreated";

// Utils
import { createPoolCreatedEvent } from "./utils/createPoolCreatedEvent";

// Numerics
import { ZERO_BD } from "../../shared/numeric";

// Mocks
import * as USDC from "../mocks/USDC";
import * as WETH from "../mocks/WETH";

// Protocol constants
import * as protocolInfo from "../../generated/protocol";

beforeEach(() => {
    clearStore(); // <-- clear the store before each test in the file
});

describe("handlePoolCreated", () => {
    describe("Given first execution", () => {
        beforeEach(() => {
            // Create new PoolCreated event
            let event = createPoolCreatedEvent(USDC.ADDRESS, WETH.ADDRESS);

            // Run the handler
            handlePoolCreated(event);
        });

        test("Should create new Protocol", () => {
            // Load the Protocol
            let protocol = Protocol.load("1")!;

            // Check the values
            assert.stringEquals(protocol.name, protocolInfo.NAME);
            assert.stringEquals(protocol.slug, protocolInfo.SLUG);
            assert.stringEquals(protocol.chainId, protocolInfo.CHAIN_ID);
            assert.stringEquals(protocol.chainSlug, protocolInfo.CHAIN_SLUG);
            assert.stringEquals(protocol.chainName, protocolInfo.CHAIN_NAME);
            assert.stringEquals(
                protocol.totalValueLockedUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                protocol.cumulativeVolumeUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                protocol.cumulativeLPRevenueUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                protocol.cumulativeProtocolRevenueUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                protocol.cumulativeTotalRevenueUSD.toString(),
                ZERO_BD.toString()
            );
            assert.i32Equals(protocol.cumulativeUniqueUsers, 0);
            assert.i32Equals(protocol.totalLiquidityPoolCount, 0);
        });

        test("Should create new Token", () => {
            // Make sure token0 is created
            let token0 = Token.load(USDC.ADDRESS.toHexString())!;

            // Contract call from mockups
            assert.stringEquals(token0.name, "USD Coin");
            assert.stringEquals(token0.symbol, "USDC");
            assert.i32Equals(token0.decimals, 6);
            assert.bigIntEquals(token0.totalSupply, BigInt.fromString("1000"));

            // Default values
            assert.stringEquals(
                token0.cumulativeVolumeUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                token0.latestPriceETH.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                token0.latestPriceETHBlockNumber.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                token0.latestMarketCapETH.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                token0.totalValueLockedUSD.toString(),
                ZERO_BD.toString()
            );

            // Make sure token1 is created
            let token1 = Token.load(WETH.ADDRESS.toHexString())!;

            // Contract call from mockups
            assert.stringEquals(token1.name, "Wrapped ETH");
            assert.stringEquals(token1.symbol, "WETH");
            assert.i32Equals(token1.decimals, 18);
            assert.bigIntEquals(token1.totalSupply, BigInt.fromString("1000"));

            // Default values
            assert.stringEquals(
                token1.cumulativeVolumeUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                token1.latestPriceETH.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                token1.latestPriceETHBlockNumber.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                token1.latestMarketCapETH.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                token1.totalValueLockedUSD.toString(),
                ZERO_BD.toString()
            );
        });
    });
});
