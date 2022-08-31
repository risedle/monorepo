import {
    describe,
    test,
    assert,
    beforeEach,
    newMockEvent,
} from "matchstick-as/assembly/index";
import { clearStore } from "matchstick-as/assembly/store";
import { Address, BigInt } from "@graphprotocol/graph-ts";

// Shared entities
import {
    getOrCreateProtocol,
    getOrCreateAccount,
    getOrCreateTransaction,
} from "../../../shared/entities";

// Mocks
import "../../mocks/USDCWETH_POOL";

// Math libs
import { ONE_ETH } from "../../../shared/libs/math";

beforeEach(() => {
    clearStore(); // <-- clear the store before each test in the file
});

describe("Given Arbitrum One blockNumber < 4291", () => {
    test("Should not fetch price from Uniswap V3", () => {
        const protocol = getOrCreateProtocol();

        // Skip test if CHAIN_ID is not arbitrum
        if (protocol.chainId != "42161") return;

        // Continue test
        const accountAddress = Address.fromString(
            "0xb0f316d156df39a2c6603fa66999c8bbcf2c67ed"
        );
        const account = getOrCreateAccount(protocol, accountAddress);
        const event = newMockEvent();
        const blockNumber = BigInt.fromString("200");
        event.block.number = blockNumber;
        event.transaction.value = ONE_ETH;

        // Call
        const transaction = getOrCreateTransaction(protocol, account, event);
        assert.stringEquals(transaction.valueUSD.toString(), "0");
        assert.bigIntEquals(transaction.blockNumber, blockNumber);
    });
});

describe("Given Arbitrum One blockNumber > 4291", () => {
    test("Should fetch price from Uniswap V3", () => {
        const protocol = getOrCreateProtocol();

        // Skip test if CHAIN_ID is not arbitrum
        if (protocol.chainId != "42161") return;

        // Continue test
        const accountAddress = Address.fromString(
            "0xb0f316d156df39a2c6603fa66999c8bbcf2c67ed"
        );
        const account = getOrCreateAccount(protocol, accountAddress);
        const event = newMockEvent();
        const blockNumber = BigInt.fromString("5000");
        event.block.number = blockNumber;
        event.transaction.value = ONE_ETH;

        // Call
        const transaction = getOrCreateTransaction(protocol, account, event);
        assert.stringEquals(
            transaction.valueUSD.toString(),
            "1583.737604216110418098434753621726"
        );
        assert.bigIntEquals(transaction.blockNumber, blockNumber);
    });
});
