import { ethers } from "ethers";
import { RPC_URL, FLTS, MIN_PROFITS } from "./config";
import { getRebalances } from "./rebalance";

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Get rebalances
async function main() {
    const calldatas = await getRebalances(provider, FLTS, MIN_PROFITS);
    console.log(calldatas);
}

main();
