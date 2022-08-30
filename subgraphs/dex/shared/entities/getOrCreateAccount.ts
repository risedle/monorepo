import { Address } from "@graphprotocol/graph-ts";

// Schema
import { Account, Protocol } from "../../generated/schema";

// Get or create new Account
export function getOrCreateAccount(
    addy: Address,
    protocol: Protocol
): Account {
    let account = Account.load(addy.toHexString());
    if (account === null) {
        account = new Account(addy.toHexString());
        account.protocol = protocol.id;
        account.save();
    }
    return account;
}
