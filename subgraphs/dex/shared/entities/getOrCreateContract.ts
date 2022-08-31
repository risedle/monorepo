import { Address } from "@graphprotocol/graph-ts";

// Schema
import { Contract, Protocol } from "../../generated/schema";

// Get or create new Contract
export function getOrCreateContract(
    protocol: Protocol,
    addy: Address
): Contract {
    let contract = Contract.load(addy.toHexString());
    if (contract === null) {
        contract = new Contract(addy.toHexString());
        contract.protocol = protocol.id;
        contract.save();
    }
    return contract;
}
