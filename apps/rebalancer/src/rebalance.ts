import { Contract, providers, Wallet } from "ethers";
import abi from "./abi.json";

import { RPC_URL, FLTS, MIN_PROFITS, WALLET_PK } from "./config";

/**
 * Bundle two functions into one
 */
export async function run() {
    const provider = new providers.JsonRpcProvider(RPC_URL);
    const wallet = new Wallet(WALLET_PK, provider);
    const contract = new Contract(
        "0x8888888856DA285c46e0A0547D84737Ad145CAd7",
        abi,
        wallet
    );

    console.log("[rebalancer] checking ...", FLTS);
    const result = await contract.getRebalances(FLTS, MIN_PROFITS);
    let calldatas = [];
    for (let calldata of result) {
        if (calldata == "0x") continue;
        calldatas.push(calldata);
    }

    // Execute rebalance
    if (calldatas.length > 0) {
        console.log("[rebalancer] executing ...", calldatas);
        const tx = await contract.multicall(calldatas);
        console.log("[rebalancer] tx hash", tx.hash);
        await tx.wait();
        console.log("[rebalancer] done");
    } else {
        console.log("[rebalancer] no rebalance");
    }
}
