// Source: uniswap/v3-subgraph
import { BigInt, Address } from "@graphprotocol/graph-ts";

// NOTE: data source name must be Factory for all subgraph.yaml
import { ERC20 } from "../../generated/Factory/ERC20";
import { ERC20SymbolBytes } from "../../generated/Factory/ERC20SymbolBytes";
import { ERC20NameBytes } from "../../generated/Factory/ERC20NameBytes";

// Static token mapping
import { TokenMap } from "./data";

function isNullEthValue(value: string): boolean {
    return (
        value ==
        "0x0000000000000000000000000000000000000000000000000000000000000001"
    );
}

export function fetchTokenSymbol(
    chainId: string,
    tokenAddress: Address
): string {
    // Check symbol from map
    if (TokenMap.has(chainId)) {
        if (TokenMap.get(chainId).has(tokenAddress.toHexString())) {
            return TokenMap.get(chainId)
                .get(tokenAddress.toHexString())
                .get("symbol");
        }
    }

    const contract = ERC20.bind(tokenAddress);
    const contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);

    // try types string and bytes32 for symbol
    let symbolValue = "unknown";
    const symbolResult = contract.try_symbol();
    if (symbolResult.reverted) {
        const symbolResultBytes = contractSymbolBytes.try_symbol();
        if (!symbolResultBytes.reverted) {
            // for broken pairs that have no symbol function exposed
            if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
                symbolValue = symbolResultBytes.value.toString();
            }
        }
    } else {
        symbolValue = symbolResult.value;
    }

    return symbolValue;
}

export function fetchTokenName(
    chainId: string,
    tokenAddress: Address
): string {
    // Check symbol from map
    if (TokenMap.has(chainId)) {
        if (TokenMap.get(chainId).has(tokenAddress.toHexString())) {
            return TokenMap.get(chainId)
                .get(tokenAddress.toHexString())
                .get("name");
        }
    }

    const contract = ERC20.bind(tokenAddress);
    const contractNameBytes = ERC20NameBytes.bind(tokenAddress);

    // try types string and bytes32 for name
    let nameValue = "unknown";
    const nameResult = contract.try_name();
    if (nameResult.reverted) {
        const nameResultBytes = contractNameBytes.try_name();
        if (!nameResultBytes.reverted) {
            // for broken exchanges that have no name function exposed
            if (!isNullEthValue(nameResultBytes.value.toHexString())) {
                nameValue = nameResultBytes.value.toString();
            }
        }
    } else {
        nameValue = nameResult.value;
    }

    return nameValue;
}

export function fetchTokenDecimals(
    chainId: string,
    tokenAddress: Address
): BigInt {
    // Check from map
    if (TokenMap.has(chainId)) {
        if (TokenMap.get(chainId).has(tokenAddress.toHexString())) {
            const decimals = TokenMap.get(chainId)
                .get(tokenAddress.toHexString())
                .get("decimals");
            return BigInt.fromString(decimals);
        }
    }

    const contract = ERC20.bind(tokenAddress);
    // try types uint8 for decimals
    const decimalResult = contract.try_decimals();
    if (!decimalResult.reverted) {
        return BigInt.fromString(decimalResult.value.toString());
    }

    return BigInt.fromString("0");
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
    const contract = ERC20.bind(tokenAddress);
    const totalSupplyResult = contract.try_totalSupply();
    if (!totalSupplyResult.reverted) {
        return totalSupplyResult.value;
    }
    return BigInt.fromString("0");
}
