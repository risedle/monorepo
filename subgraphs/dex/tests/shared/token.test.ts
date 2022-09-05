import { describe, test, assert } from "matchstick-as/assembly/index";

import { Address, BigInt } from "@graphprotocol/graph-ts";

import {
    fetchTokenSymbol,
    fetchTokenName,
    fetchTokenDecimals,
} from "../../shared/token";

describe("fetchTokenSymbol", () => {
    describe("Given Arbitrum One and WETH address", () => {
        test("Should return WETH", () => {
            const symbol = fetchTokenSymbol(
                "42161",
                Address.fromString(
                    "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
                )
            );
            assert.stringEquals(symbol, "WETH");
        });
    });
});

describe("fetchTokenName", () => {
    describe("Given Arbitrum One and WETH address", () => {
        test("Should return Wrapped ETH", () => {
            const name = fetchTokenName(
                "42161",
                Address.fromString(
                    "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
                )
            );
            assert.stringEquals(name, "Wrapped Ethereum");
        });
    });
});

describe("fetchTokenDecimals", () => {
    describe("Given Arbitrum One and WETH address", () => {
        test("Should return 18", () => {
            const decimals = fetchTokenDecimals(
                "42161",
                Address.fromString(
                    "0x82af49447d8a07e3bd95bd0d56f35241523fbab1"
                )
            );
            assert.bigIntEquals(decimals, BigInt.fromString("18"));
        });
    });
});
