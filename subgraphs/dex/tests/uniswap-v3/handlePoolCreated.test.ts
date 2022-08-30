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
    LiquidityPoolFee,
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
    describe("Given first execution", () => {
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
            assert.i32Equals(token0.decimals, 6);

            // Make sure token1 is created
            let token1 = Token.load(WETH.ADDRESS.toHexString())!;

            // Contract call from mockups
            assert.stringEquals(token1.name, "Wrapped ETH");
            assert.stringEquals(token1.symbol, "WETH");
            assert.i32Equals(token1.decimals, 18);
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
            assert.bigIntEquals(
                pool.createdAtTimestamp,
                event.block.timestamp
            );
            assert.bigIntEquals(pool.createdAtBlockNumber, event.block.number);

            assert.stringEquals(
                pool.totalValueLockedUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                pool.cumulativeVolumeUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                pool.cumulativeLPRevenueUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                pool.cumulativeProtocolRevenueUSD.toString(),
                ZERO_BD.toString()
            );
            assert.stringEquals(
                pool.cumulativeTotalRevenueUSD.toString(),
                ZERO_BD.toString()
            );
            assert.i32Equals(pool.cumulativeUniqueUsers, 0);
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

        test("Should create new LiquidityPoolFee", () => {
            // Create new PoolCreated event
            let event = createPoolCreatedEvent(USDC.ADDRESS, WETH.ADDRESS);
            // Run the handler
            handlePoolCreated(event);

            // Should create new lp, protocol and swap fee
            let lpId = event.params.pool.toHexString().concat("-lp");
            let poolLpFee = LiquidityPoolFee.load(lpId)!;
            assert.stringEquals(poolLpFee.percentage.toString(), "0.3");
            assert.stringEquals(poolLpFee.type.toString(), "FIXED_LP_FEE");

            let protocolId = event.params.pool
                .toHexString()
                .concat("-protocol");
            let poolProtocolFee = LiquidityPoolFee.load(protocolId)!;
            assert.stringEquals(poolProtocolFee.percentage.toString(), "0");
            assert.stringEquals(
                poolProtocolFee.type.toString(),
                "FIXED_PROTOCOL_FEE"
            );

            let swapId = event.params.pool.toHexString().concat("-swap");
            let poolSwapFee = LiquidityPoolFee.load(swapId)!;
            assert.stringEquals(poolSwapFee.percentage.toString(), "0.3");
            assert.stringEquals(poolSwapFee.type.toString(), "FIXED_SWAP_FEE");
        });
    });
});
