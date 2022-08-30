import {
    describe,
    test,
    assert,
    beforeEach,
    newMockEvent,
} from "matchstick-as/assembly/index";
import { clearStore } from "matchstick-as/assembly/store";
import {
    Address,
    BigInt,
    BigDecimal,
    ethereum,
} from "@graphprotocol/graph-ts";

// Schema
import {
    Protocol,
    Token,
    LiquidityPool,
    TokenLiquidityPool,
} from "../../../generated/schema";

// Mocks
import * as USDC from "../../mocks/USDC";
import * as WETH from "../../mocks/WETH";

// Math libs
import { FIFTY_PERCENT } from "../../../shared/libs/math";

// Protocol constants
import * as protocolInfo from "../../../generated/protocol";

// Shared entities
import { createLiquidityPool } from "../../../shared/entities";

beforeEach(() => {
    clearStore(); // <-- clear the store before each test in the file
});

describe("createLiquidityPool", () => {
    test("Should create new Protocol", () => {
        const poolAddress = Address.fromString(
            "0x17c14d2c404d167802b16c450d3c99f88f2c4f4d"
        );
        const poolName = "Uniswap V3 USDC/WETH 0.3%";
        const poolSlug = "uniswap-v3-usdc-weth-0.3";
        const tokenCount = 2;
        const tokenAddresses = [USDC.ADDRESS, WETH.ADDRESS];
        const tokenWeights = [FIFTY_PERCENT, FIFTY_PERCENT];
        const lpFee = BigDecimal.fromString("0.3");
        const protocolFee = BigDecimal.fromString("0");
        const swapFee = BigDecimal.fromString("0.3");
        const event = newMockEvent();
        createLiquidityPool(
            poolAddress,
            poolName,
            poolSlug,
            tokenCount,
            tokenAddresses,
            tokenWeights,
            lpFee,
            protocolFee,
            swapFee,
            event.block,
            event.transaction,
            event.receipt
        );

        // Load the Protocol
        let protocol = Protocol.load("1")!;

        // Check the values
        assert.stringEquals(protocol.name, protocolInfo.NAME);
        assert.stringEquals(protocol.slug, protocolInfo.SLUG);
        assert.stringEquals(protocol.chainId, protocolInfo.CHAIN_ID);
        assert.stringEquals(protocol.chainSlug, protocolInfo.CHAIN_SLUG);
        assert.stringEquals(protocol.chainName, protocolInfo.CHAIN_NAME);
    });
});
