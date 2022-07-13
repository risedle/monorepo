import { Contract, providers } from "ethers";
import abi from "./abi.json";

/**
 * Get profitable rebalance opportunities
 */
export async function getRebalances(
    provider: providers.JsonRpcProvider,
    flts: Array<string>,
    minProfits: Array<string>
): Promise<Array<string>> {
    const contract = new Contract(
        "0x8888888856DA285c46e0A0547D84737Ad145CAd7",
        abi,
        provider
    );
    const result = await contract.getRebalances(flts, minProfits);
    let calldatas = [];
    for (let calldata of result) {
        if (calldata == "0x") continue;
        calldatas.push(calldata);
    }
    return calldatas;
}
