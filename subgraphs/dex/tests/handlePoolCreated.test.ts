import {
    describe,
    test,
    assert,
    beforeEach,
} from "matchstick-as/assembly/index";
import { logStore, clearStore } from "matchstick-as/assembly/store";
import { Address, BigInt } from "@graphprotocol/graph-ts";

// Schema
import { Token } from "../generated/schema";

// Handler
import { handlePoolCreated } from "../src/handlePoolCreated";

// Utils
import { createPoolCreatedEvent } from "./utils/createPoolCreatedEvent";

// Mocks

beforeEach(() => {
    clearStore(); // <-- clear the store before each test in the file
});

describe("handlePoolCreated", () => {
    describe("Given new token", () => {
        test("Should create new Token", () => {
            // Create new PoolCreated event
            let token0Address = Address.fromString(
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            );
            let token1Address = Address.fromString(
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
            );
            let event = createPoolCreatedEvent(token0Address, token1Address);

            // Run the handler
            handlePoolCreated(event);

            // Make sure token0 is created
            let token0 = Token.load(token0Address.toString())!;
            assert.stringEquals(token0.name, "USD Coin");
            assert.stringEquals(token0.symbol, "USDC");
            assert.bigIntEquals(token0.decimals, BigInt.fromString("6"));

            // Make sure token1 is created
            let token1 = Token.load(token1Address.toString())!;
            assert.stringEquals(token1.name, "Wrapped Ether");
            assert.stringEquals(token1.symbol, "WETH");
            assert.bigIntEquals(token1.decimals, BigInt.fromString("18"));
        });
    });
});
