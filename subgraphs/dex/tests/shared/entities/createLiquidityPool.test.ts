import {
    describe,
    test,
    assert,
    beforeEach,
    newMockEvent,
} from "matchstick-as/assembly/index";
import { clearStore } from "matchstick-as/assembly/store";
import { Address, BigInt, BigDecimal } from "@graphprotocol/graph-ts";

// Schema
import {
    Account,
    Transaction,
    LiquidityPool,
    TokenLiquidityPool,
} from "../../../generated/schema";

// Mocks
import * as USDC from "../../mocks/USDC";
import * as WETH from "../../mocks/WETH";

// Math libs
import { FIFTY_PERCENT } from "../../../shared/libs/math";

// Shared entities
import {
    getOrCreateProtocol,
    getOrCreateToken,
    createLiquidityPool,
} from "../../../shared/entities";

beforeEach(() => {
    clearStore(); // <-- clear the store before each test in the file
});

describe("Given Uniswap V3 Pool", () => {
    test("Should create new Account", () => {
        const protocol = getOrCreateProtocol();
        const token0 = getOrCreateToken(protocol, USDC.ADDRESS);
        const token1 = getOrCreateToken(protocol, WETH.ADDRESS);

        // Pool
        const poolAddress = Address.fromString(
            "0x17c14d2c404d167802b16c450d3c99f88f2c4f4d"
        );
        const poolName = "Uniswap V3 USDC/WETH 0.3%";
        const poolSlug = "uniswap-v3-usdc-weth-0.3";
        const tokenCount = BigInt.fromString("2");
        const tokens = [token0, token1];
        const tokenWeights = [FIFTY_PERCENT, FIFTY_PERCENT];
        const lpFee = BigDecimal.fromString("0.3");
        const protocolFee = BigDecimal.fromString("0");
        const swapFee = BigDecimal.fromString("0.3");
        const event = newMockEvent();
        createLiquidityPool(
            protocol,
            event,
            poolAddress,
            poolName,
            poolSlug,
            tokenCount,
            tokens,
            tokenWeights,
            lpFee,
            protocolFee,
            swapFee
        );

        // Check account
        const account = Account.load(event.transaction.from.toHexString());
        assert.assertTrue(account != null);
    });

    test("Should create new Transaction", () => {
        const protocol = getOrCreateProtocol();
        const token0 = getOrCreateToken(protocol, USDC.ADDRESS);
        const token1 = getOrCreateToken(protocol, WETH.ADDRESS);

        // Pool
        const poolAddress = Address.fromString(
            "0x17c14d2c404d167802b16c450d3c99f88f2c4f4d"
        );
        const poolName = "Uniswap V3 USDC/WETH 0.3%";
        const poolSlug = "uniswap-v3-usdc-weth-0.3";
        const tokenCount = BigInt.fromString("2");
        const tokens = [token0, token1];
        const tokenWeights = [FIFTY_PERCENT, FIFTY_PERCENT];
        const lpFee = BigDecimal.fromString("0.3");
        const protocolFee = BigDecimal.fromString("0");
        const swapFee = BigDecimal.fromString("0.3");
        const event = newMockEvent();
        createLiquidityPool(
            protocol,
            event,
            poolAddress,
            poolName,
            poolSlug,
            tokenCount,
            tokens,
            tokenWeights,
            lpFee,
            protocolFee,
            swapFee
        );
        // eslint-disable-next-line
        const transaction = Transaction.load(
            event.transaction.hash.toHexString()
        )!;
        assert.bigIntEquals(transaction.timestamp, event.block.timestamp);
        assert.bigIntEquals(transaction.blockNumber, event.block.number);
        assert.bigIntEquals(transaction.value, event.transaction.value);
        assert.stringEquals(transaction.valueUSD.toString(), "0");
        assert.stringEquals(
            transaction.from,
            event.transaction.from.toHexString()
        );
    });

    test("Should create new LiquidityPool", () => {
        const protocol = getOrCreateProtocol();
        const token0 = getOrCreateToken(protocol, USDC.ADDRESS);
        const token1 = getOrCreateToken(protocol, WETH.ADDRESS);

        // Pool
        const poolAddress = Address.fromString(
            "0x17c14d2c404d167802b16c450d3c99f88f2c4f4d"
        );
        const poolName = "Uniswap V3 USDC/WETH 0.3%";
        const poolSlug = "uniswap-v3-usdc-weth-0.3";
        const tokenCount = BigInt.fromString("2");
        const tokens = [token0, token1];
        const tokenWeights = [FIFTY_PERCENT, FIFTY_PERCENT];
        const lpFee = BigDecimal.fromString("0.3");
        const protocolFee = BigDecimal.fromString("0");
        const swapFee = BigDecimal.fromString("0.3");
        const event = newMockEvent();
        createLiquidityPool(
            protocol,
            event,
            poolAddress,
            poolName,
            poolSlug,
            tokenCount,
            tokens,
            tokenWeights,
            lpFee,
            protocolFee,
            swapFee
        );
        // eslint-disable-next-line
        const pool = LiquidityPool.load(poolAddress.toHexString())!;
        assert.stringEquals(pool.name, poolName);
        assert.stringEquals(pool.slug, poolSlug);
        assert.bigIntEquals(pool.tokenCount, tokenCount);
        assert.bigIntEquals(pool.createdAtTimestamp, event.block.timestamp);
        assert.bigIntEquals(pool.createdAtBlockNumber, event.block.number);
        assert.stringEquals(pool.lpFee.toString(), lpFee.toString());
        assert.stringEquals(
            pool.protocolFee.toString(),
            protocolFee.toString()
        );
        assert.stringEquals(pool.swapFee.toString(), swapFee.toString());
    });

    test("Should create new TokenLiquidityPool", () => {
        const protocol = getOrCreateProtocol();
        const token0 = getOrCreateToken(protocol, USDC.ADDRESS);
        const token1 = getOrCreateToken(protocol, WETH.ADDRESS);

        // Pool
        const poolAddress = Address.fromString(
            "0x17c14d2c404d167802b16c450d3c99f88f2c4f4d"
        );
        const poolName = "Uniswap V3 USDC/WETH 0.3%";
        const poolSlug = "uniswap-v3-usdc-weth-0.3";
        const tokenCount = BigInt.fromString("2");
        const tokens = [token0, token1];
        const tokenWeights = [FIFTY_PERCENT, FIFTY_PERCENT];
        const lpFee = BigDecimal.fromString("0.3");
        const protocolFee = BigDecimal.fromString("0");
        const swapFee = BigDecimal.fromString("0.3");
        const event = newMockEvent();
        createLiquidityPool(
            protocol,
            event,
            poolAddress,
            poolName,
            poolSlug,
            tokenCount,
            tokens,
            tokenWeights,
            lpFee,
            protocolFee,
            swapFee
        );
        const token0Id = USDC.ADDRESS.toHexString()
            .concat("-")
            .concat(poolAddress.toHexString());
        // eslint-disable-next-line
        const token0Pool = TokenLiquidityPool.load(token0Id)!;
        assert.stringEquals(token0Pool.weightPercentage.toString(), "50");

        const token1Id = WETH.ADDRESS.toHexString()
            .concat("-")
            .concat(poolAddress.toHexString());
        // eslint-disable-next-line
        const token1Pool = TokenLiquidityPool.load(token1Id)!;
        assert.stringEquals(token1Pool.weightPercentage.toString(), "50");
    });
});
