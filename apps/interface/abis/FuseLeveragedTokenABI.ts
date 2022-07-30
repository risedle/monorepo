import { ethers } from "ethers";

export const FuseLeveragedTokenABI = new ethers.utils.Interface([
    // Read
    "function totalSupply() external view returns (uint256 _totalSupply)",
    "function maxSupply() external view returns (uint256 _maxSupply)",
    "function sharesToUnderlying(uint256 _amount) external view returns (uint256 _ca, uint256 _da)",
]);

export default FuseLeveragedTokenABI;
