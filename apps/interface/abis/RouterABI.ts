import { ethers } from "ethers";

export const RouterABI = new ethers.utils.Interface([
    // Read
    "function getAmountIn(address _flt, address _tokenIn, uint256 _amountOut) external view returns (uint256 _amountIn)",
]);

export default RouterABI;
