import { ethers } from "ethers";

export const ChainlinkABI = new ethers.utils.Interface([
    // Read
    "function latestAnswer() external view returns (uint256 _answer)",
]);

export default ChainlinkABI;
