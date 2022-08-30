import { ethereum } from "@graphprotocol/graph-ts";

// Schema
import {
    Transaction,
    Account,
    Contract,
    Protocol,
} from "../../generated/schema";

// Math libs
import { convertEthToDecimal } from "../libs/math";

// Price utilities
import { getNativeTokenPriceUSD } from "../price";

// Get or create new transaction
export function getOrCreateTransaction(
    block: ethereum.Block,
    transaction: ethereum.Transaction,
    receipt: ethereum.TransactionReceipt,
    account: Account,
    contract: Contract,
    protocol: Protocol
): Transaction {
    let tx = Transaction.load(transaction.hash.toHexString());
    if (tx === null) {
        // Get ETH price
        const ethPrice = getNativeTokenPriceUSD(block);

        // Create new transaction
        tx = new Transaction(transaction.hash.toHexString());
        tx.timestamp = block.timestamp;
        tx.blockNumber = block.number;
        tx.status = receipt.status;
        tx.gasLimit = transaction.gasLimit;
        tx.gasPrice = transaction.gasPrice;
        tx.gasUsed = receipt.gasUsed;
        tx.transactionFeeUSD = convertEthToDecimal(transaction.gasPrice)
            .times(convertEthToDecimal(receipt.gasUsed))
            .times(ethPrice);
        tx.value = transaction.value;
        tx.valueUSD = convertEthToDecimal(transaction.value).times(ethPrice);
        tx.from = account.id;
        tx.to = contract.id;
        tx.save();
    }
    return tx;
}
