import { ethereum } from "@graphprotocol/graph-ts";

// Schema
import { Transaction, Account, Protocol } from "../../generated/schema";

// Math libs
import { convertEthToDecimal } from "../libs/math";

// Shared entities
import { getOrCreateContract, getOrCreateNativeTokenPrice } from "./index";

// Get or create new transaction
export function getOrCreateTransaction(
    protocol: Protocol,
    account: Account,
    event: ethereum.Event
): Transaction {
    let tx = Transaction.load(event.transaction.hash.toHexString());
    if (tx === null) {
        // Get ETH price
        const price = getOrCreateNativeTokenPrice(protocol, event.block);

        // Create new transaction
        tx = new Transaction(event.transaction.hash.toHexString());
        tx.timestamp = event.block.timestamp;
        tx.blockNumber = event.block.number;
        tx.value = event.transaction.value;
        tx.valueUSD = convertEthToDecimal(event.transaction.value).times(
            price.usd
        );
        tx.from = account.id;

        // Contract
        const contractAddress = event.transaction.to;
        if (contractAddress !== null) {
            const contract = getOrCreateContract(protocol, contractAddress);
            tx.to = contract.id;
        }
        tx.save();
        price.save();
    }
    return tx;
}
