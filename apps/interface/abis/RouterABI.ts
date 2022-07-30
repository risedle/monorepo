import { ethers } from "ethers";

export const RouterABI = new ethers.utils.Interface([
    // Read
    "function getAmountIn(address _flt, address _tokenIn, uint256 _amountOut) external view returns (uint256 _amountIn)",
    "function getAmountOut(address _flt, address _tokenOut, uint256 _amountIn) external view returns (uint256 _amountOut)",
]);

export default RouterABI;
