import {
    describe,
    test,
    assert,
    beforeEach,
} from "matchstick-as/assembly/index";
import { logStore, clearStore } from "matchstick-as/assembly/store";
import {
    ethereum,
    BigInt,
    Address,
    BigDecimal,
    Bytes,
} from "@graphprotocol/graph-ts";

import {
    Factory,
    Transaction,
    Swap,
    FLT,
    FLTHourData,
    FLTDayData,
    ETHPriceData,
    Token,
    User,
    OpenPosition,
} from "../generated/schema";
import {
    createSwapEvent,
    ETHRISE,
    USDC,
    USER,
    SENDER,
    RECIPIENT,
} from "./helpers";
import { handleSwap } from "../src/swap";
import {
    FACTORY_ADDRESS,
    loadOrInitializeFactory,
    loadOrInitializeFLT,
} from "../src/helpers";

// Contract call mocks
import "./mocks";

beforeEach(() => {
    clearStore(); // <-- clear the store before each test in the file
    // Create dummy factory and FLT first
    createDummy(ETHRISE);
});

function createDummy(tokenAddress: string): void {
    let factory = loadOrInitializeFactory();
    let flt = loadOrInitializeFLT(Address.fromString(tokenAddress));
    let ethPriceData = new ETHPriceData("latest");
    ethPriceData.priceUSD = BigDecimal.fromString("1088.87");
    ethPriceData.save();
    factory.save();
    flt.save();
}

describe("handleSwap", () => {
    describe("given FLT as tokenOut", () => {
        test("should create new Transaction", () => {
            // Create mock event then call the handler
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(event);

            // Make sure Transaction is saved
            let transactionId = event.transaction.hash.toHexString();
            let transaction = Transaction.load(transactionId)!;
            assert.stringEquals(transaction.id, transactionId);
            assert.bigIntEquals(transaction.blockNumber, event.block.number);
            assert.bigIntEquals(transaction.timestamp, event.block.timestamp);
            assert.i32Equals(transaction.swaps.length, 1);
        });

        test("should increase trade volume", () => {
            // Create mock event then call the handler
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(event);

            let factory = Factory.load(FACTORY_ADDRESS)!;
            let flt = FLT.load(ETHRISE)!;
            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Trade volume should increased
            assert.stringEquals(
                factory.totalVolumeUSD.toString(),
                "100.000000000000025151"
            );
            assert.stringEquals(flt.totalVolume.toString(), "1");
            assert.stringEquals(
                flt.totalVolumeUSD.toString(),
                "100.000000000000025151"
            );
            assert.stringEquals(fltHourData.tradeVolume.toString(), "1");
            assert.stringEquals(
                fltHourData.tradeVolumeUSD.toString(),
                "100.000000000000025151"
            );
            assert.stringEquals(fltDayData.tradeVolume.toString(), "1");
            assert.stringEquals(
                fltDayData.tradeVolumeUSD.toString(),
                "100.000000000000025151"
            );
        });

        test("should increase fees", () => {
            // Create mock event then call the handler
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(event);

            let factory = Factory.load(FACTORY_ADDRESS)!;
            let flt = FLT.load(ETHRISE)!;
            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Trade fee should increased
            assert.stringEquals(
                factory.totalFeeUSD.toString(),
                "0.00099999999999970299"
            );
            assert.stringEquals(
                flt.totalFeeUSD.toString(),
                "0.00099999999999970299"
            );
            assert.stringEquals(
                fltHourData.tradeFeeUSD.toString(),
                "0.00099999999999970299"
            );
            assert.stringEquals(
                fltDayData.tradeFeeUSD.toString(),
                "0.00099999999999970299"
            );
        });

        test("should increase total supply", () => {
            // Create mock event then call the handler
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(event);

            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Total supply should increased
            assert.stringEquals(fltHourData.totalSupply.toString(), "1");
            assert.stringEquals(fltDayData.totalSupply.toString(), "1");
        });

        test("should increase tx count", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(event);
            let factory = Factory.load(FACTORY_ADDRESS)!;
            let flt = FLT.load(ETHRISE)!;
            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Transactions count should increased
            assert.bigIntEquals(factory.totalTxns, BigInt.fromString("1"));
            assert.bigIntEquals(flt.totalTxns, BigInt.fromString("1"));
            assert.bigIntEquals(fltHourData.tradeTxns, BigInt.fromString("1"));
            assert.bigIntEquals(fltDayData.tradeTxns, BigInt.fromString("1"));
        });

        test("should create new Swap", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(event);
            // logStore();

            // Make sure Swap is populated
            let transactionId = event.transaction.hash.toHexString();
            let swapId = transactionId
                .concat("-")
                .concat(BigInt.fromI32(0).toString());
            let swap = Swap.load(swapId)!;

            // Check basic metadata
            assert.stringEquals(swap.id, swapId);
            assert.bigIntEquals(swap.timestamp, event.block.timestamp);
            assert.stringEquals(swap.flt, ETHRISE);

            // Check user
            assert.bytesEquals(swap.sender, Bytes.fromHexString(SENDER));
            assert.bytesEquals(swap.recipient, Bytes.fromHexString(RECIPIENT));
            assert.stringEquals(swap.user, USER);

            // tokenIn and tokenOut should be created
            let tokenIn = Token.load(USDC)!;
            let tokenOut = Token.load(ETHRISE)!;
            assert.stringEquals(tokenIn.symbol, "USDC");
            assert.stringEquals(tokenOut.symbol, "ETHRISE");
            assert.stringEquals(swap.tokenIn, USDC);
            assert.stringEquals(swap.tokenOut, ETHRISE);
            assert.stringEquals(swap.amountIn.toString(), "10");
            assert.stringEquals(swap.amountOut.toString(), "1");
            assert.stringEquals(swap.feeAmount.toString(), "0.001");
            assert.stringEquals(
                swap.feeAmountUSD.toString(),
                "0.00099999999999970299"
            );
        });

        test("should update user open position", () => {
            // Create mock event then call the handler
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let event = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(event);
            // logStore();

            // Make sure user have open position
            let user = User.load(USER)!;
            let position = OpenPosition.load(
                USER.concat("-").concat(ETHRISE)
            )!;
            assert.stringEquals(user.id, USER);
            assert.i32Equals(user.openPositions.length, 1);
            assert.stringEquals(
                user.openPositions[0],
                USER.concat("-").concat(ETHRISE)
            );
            assert.stringEquals(position.amount.toString(), "1");
            assert.stringEquals(
                position.amountUSD.toString(),
                "100.000000000000025151"
            );
        });
    });

    describe("given FLT as tokenIn", () => {
        test("should create new Transaction", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE

            let buyEvent = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(buyEvent);
            let sellEvent = createSwapEvent(
                ETHRISE,
                ETHRISE,
                USDC,
                ethriseAmount, // ETHRISE amount as amountIn
                "10000000", // 10 USDC as amountOut
                "1000", // 0.001 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(sellEvent);

            // Make sure Transaction is saved
            let transactionId = sellEvent.transaction.hash.toHexString();
            let transaction = Transaction.load(transactionId)!;
            assert.stringEquals(transaction.id, transactionId);
            assert.bigIntEquals(
                transaction.blockNumber,
                sellEvent.block.number
            );
            assert.bigIntEquals(
                transaction.timestamp,
                sellEvent.block.timestamp
            );
        });

        test("should increase trade volume", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let buyEvent = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(buyEvent);
            let sellEvent = createSwapEvent(
                ETHRISE,
                ETHRISE,
                USDC,
                ethriseAmount, // ETHRISE amount as amountIn
                "10000000", // 10 USDC as amountOut
                "1000", // 0.001 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(sellEvent);

            let factory = Factory.load(FACTORY_ADDRESS)!;
            let flt = FLT.load(ETHRISE)!;
            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Trade volume should increased
            assert.stringEquals(
                factory.totalVolumeUSD.toString(),
                "200.000000000000050302"
            );
            assert.stringEquals(flt.totalVolume.toString(), "2");
            assert.stringEquals(
                flt.totalVolumeUSD.toString(),
                "200.000000000000050302"
            );
            assert.stringEquals(fltHourData.tradeVolume.toString(), "2");
            assert.stringEquals(
                fltHourData.tradeVolumeUSD.toString(),
                "200.000000000000050302"
            );
            assert.stringEquals(fltDayData.tradeVolume.toString(), "2");
            assert.stringEquals(
                fltDayData.tradeVolumeUSD.toString(),
                "200.000000000000050302"
            );
        });

        test("should increase fees", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let buyEvent = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(buyEvent);
            let sellEvent = createSwapEvent(
                ETHRISE,
                ETHRISE,
                USDC,
                ethriseAmount, // ETHRISE amount as amountIn
                "10000000", // 10 USDC as amountOut
                "1000", // 0.001 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(sellEvent);

            let factory = Factory.load(FACTORY_ADDRESS)!;
            let flt = FLT.load(ETHRISE)!;
            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Trade fee should increased
            assert.stringEquals(
                factory.totalFeeUSD.toString(),
                "0.00199999999999940598"
            );
            assert.stringEquals(
                flt.totalFeeUSD.toString(),
                "0.00199999999999940598"
            );
            assert.stringEquals(
                fltHourData.tradeFeeUSD.toString(),
                "0.00199999999999940598"
            );
            assert.stringEquals(
                fltDayData.tradeFeeUSD.toString(),
                "0.00199999999999940598"
            );
        });

        test("should decrease total supply", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let buyEvent = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(buyEvent);
            let sellEvent = createSwapEvent(
                ETHRISE,
                ETHRISE,
                USDC,
                ethriseAmount, // ETHRISE amount as amountIn
                "10000000", // 10 USDC as amountOut
                "1000", // 0.001 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(sellEvent);

            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Total supply should decreased
            assert.stringEquals(fltHourData.totalSupply.toString(), "0");
            assert.stringEquals(fltDayData.totalSupply.toString(), "0");
        });

        test("should increase tx count", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let buyEvent = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(buyEvent);
            let sellEvent = createSwapEvent(
                ETHRISE,
                ETHRISE,
                USDC,
                ethriseAmount, // ETHRISE amount as amountIn
                "10000000", // 10 USDC as amountOut
                "1000", // 0.001 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(sellEvent);

            let factory = Factory.load(FACTORY_ADDRESS)!;
            let flt = FLT.load(ETHRISE)!;
            let fltHourData = FLTHourData.load(ETHRISE.concat("-0"))!;
            let fltDayData = FLTDayData.load(ETHRISE.concat("-0"))!;

            // Transactions count should increased
            assert.bigIntEquals(factory.totalTxns, BigInt.fromString("2"));
            assert.bigIntEquals(flt.totalTxns, BigInt.fromString("2"));
            assert.bigIntEquals(fltHourData.tradeTxns, BigInt.fromString("2"));
            assert.bigIntEquals(fltDayData.tradeTxns, BigInt.fromString("2"));
        });

        test("should create new Swap", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let buyEvent = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(buyEvent);
            let sellEvent = createSwapEvent(
                ETHRISE,
                ETHRISE,
                USDC,
                ethriseAmount, // ETHRISE amount as amountIn
                "10000000", // 10 USDC as amountOut
                "1000", // 0.001 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(sellEvent);

            let transactionId = sellEvent.transaction.hash.toHexString();
            let swapId = transactionId.concat("-1");
            let swap = Swap.load(swapId)!;
            assert.stringEquals(swap.id, swapId);
            assert.bigIntEquals(swap.timestamp, sellEvent.block.timestamp);
            assert.stringEquals(swap.flt, ETHRISE);

            // Check user
            assert.bytesEquals(swap.sender, Bytes.fromHexString(SENDER));
            assert.bytesEquals(swap.recipient, Bytes.fromHexString(RECIPIENT));
            assert.stringEquals(swap.user, USER);

            let tokenIn = Token.load(ETHRISE)!;
            let tokenOut = Token.load(USDC)!;
            assert.stringEquals(tokenIn.symbol, "ETHRISE");
            assert.stringEquals(tokenOut.symbol, "USDC");
            assert.stringEquals(swap.tokenIn, ETHRISE);
            assert.stringEquals(swap.tokenOut, USDC);
            assert.stringEquals(swap.amountIn.toString(), "1");
            assert.stringEquals(swap.amountOut.toString(), "10");
            assert.stringEquals(swap.feeAmount.toString(), "0.001");
            assert.stringEquals(
                swap.feeAmountUSD.toString(),
                "0.00099999999999970299"
            );
        });

        test("should update user open position", () => {
            let ethriseAmount = "1000000000000000000"; // 1 ETHRISE
            let buyEvent = createSwapEvent(
                ETHRISE,
                USDC,
                ETHRISE,
                "10000000", // 10 USDC as amountIn
                ethriseAmount, // ETHRISE amount as amountOut
                "1000", // 0.01 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(buyEvent);

            let user = User.load(USER)!;
            let position = OpenPosition.load(
                USER.concat("-").concat(ETHRISE)
            )!;
            assert.stringEquals(user.id, USER);
            assert.i32Equals(user.openPositions.length, 1);
            assert.stringEquals(
                user.openPositions[0],
                USER.concat("-").concat(ETHRISE)
            );
            assert.stringEquals(position.amount.toString(), "1");
            assert.stringEquals(
                position.amountUSD.toString(),
                "100.000000000000025151"
            );

            let sellEvent = createSwapEvent(
                ETHRISE,
                ETHRISE,
                USDC,
                ethriseAmount, // ETHRISE amount as amountIn
                "10000000", // 10 USDC as amountOut
                "1000", // 0.001 USDC as feeAmount
                "30000000000000000" // ETHRISE price in ETH
            );
            handleSwap(sellEvent);

            user = User.load(USER)!;
            position = OpenPosition.load(USER.concat("-").concat(ETHRISE))!;
            assert.stringEquals(user.id, USER);
            assert.i32Equals(user.openPositions.length, 1);
            assert.stringEquals(
                user.openPositions[0],
                USER.concat("-").concat(ETHRISE)
            );
            assert.stringEquals(position.amount.toString(), "0");
            assert.stringEquals(position.amountUSD.toString(), "0");
        });
    });
});
