import {
    describe,
    test,
    assert,
    beforeEach,
} from "matchstick-as/assembly/index";
import { logStore, clearStore } from "matchstick-as/assembly/store";
import { Address, BigInt } from "@graphprotocol/graph-ts";

// Schema
import {
    Protocol,
    Token,
    LiquidityPool,
    TokenLiquidityPool,
} from "../../generated/schema";

// Handler
import { handlePoolCreated } from "../../protocols/uniswap-v3/handlers/handlePoolCreated";

// Utils
import { createPoolCreatedEvent } from "./utils/createPoolCreatedEvent";

// Libs
import { ZERO_BD } from "../../shared/libs/math";

// Mocks
import * as USDC from "../mocks/USDC";
import * as WETH from "../mocks/WETH";

// Protocol constants
import * as protocolInfo from "../../generated/protocol";

beforeEach(() => {
    clearStore(); // <-- clear the store before each test in the file
});

describe("handlePoolCreated", () => {
    test("Should create new Protocol", () => {
        // Create new PoolCreated event
        let event = createPoolCreatedEvent(USDC.ADDRESS, WETH.ADDRESS);
        // Run the handler
        handlePoolCreated(event);

        // Load the Protocol
        let protocol = Protocol.load("1")!;

        // Check the values
        assert.stringEquals(protocol.name, protocolInfo.NAME);
        assert.stringEquals(protocol.slug, protocolInfo.SLUG);
        assert.stringEquals(protocol.chainId, protocolInfo.CHAIN_ID);
        assert.stringEquals(protocol.chainSlug, protocolInfo.CHAIN_SLUG);
        assert.stringEquals(protocol.chainName, protocolInfo.CHAIN_NAME);
    });

    test("Should create new Token", () => {
        // Create new PoolCreated event
        let event = createPoolCreatedEvent(USDC.ADDRESS, WETH.ADDRESS);
        // Run the handler
        handlePoolCreated(event);

        // Make sure token0 is created
        let token0 = Token.load(USDC.ADDRESS.toHexString())!;

        // Contract call from mockups
        assert.stringEquals(token0.name, "USD Coin");
        assert.stringEquals(token0.symbol, "USDC");
        assert.bigIntEquals(token0.decimals, BigInt.fromString("6"));

        // Make sure token1 is created
        let token1 = Token.load(WETH.ADDRESS.toHexString())!;

        // Contract call from mockups
        assert.stringEquals(token1.name, "Wrapped ETH");
        assert.stringEquals(token1.symbol, "WETH");
        assert.bigIntEquals(token1.decimals, BigInt.fromString("18"));
    });

    test("Should create new LiquidityPool", () => {
        // Create new PoolCreated event
        let event = createPoolCreatedEvent(USDC.ADDRESS, WETH.ADDRESS);
        // Run the handler
        handlePoolCreated(event);

        // Load the Protocol
        let pool = LiquidityPool.load(event.params.pool.toHexString())!;

        // Check the values
        assert.stringEquals(pool.name, "Uniswap V3 USDC/WETH 0.3%");
        assert.stringEquals(pool.slug, "uniswap-v3-usdc-weth-0.3");
        assert.i32Equals(pool.tokenCount, 2);
        assert.bigIntEquals(pool.createdAtTimestamp, event.block.timestamp);
        assert.bigIntEquals(pool.createdAtBlockNumber, event.block.number);
    });

    test("Should create new TokenLiquidityPool", () => {
        // Create new PoolCreated event
        let event = createPoolCreatedEvent(USDC.ADDRESS, WETH.ADDRESS);
        // Run the handler
        handlePoolCreated(event);

        let token0Id = USDC.ADDRESS.toHexString()
            .concat("-")
            .concat(event.params.pool.toHexString());
        let token0 = TokenLiquidityPool.load(token0Id)!;
        assert.stringEquals(token0.weightPercentage.toString(), "0.5");

        let token1Id = WETH.ADDRESS.toHexString()
            .concat("-")
            .concat(event.params.pool.toHexString());
        let token1 = TokenLiquidityPool.load(token1Id)!;
        assert.stringEquals(token1.weightPercentage.toString(), "0.5");
    });
});
