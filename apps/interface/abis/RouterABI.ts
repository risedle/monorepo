import { ethers } from "ethers";

export const RouterABI = new ethers.utils.Interface([
    // Read
    "function getAmountIn(address _flt, address _tokenIn, uint256 _amountOut) external view returns (uint256 _amountIn)",
    "function getAmountOut(address _flt, address _tokenOut, uint256 _amountIn) external view returns (uint256 _amountOut)",

    // Write
    "function swapTokensForExactFLT(address _tokenIn, uint256 _maxAmountIn, address _flt, uint256 _amountOut) external",
    "function swapExactFLTForTokens(address _flt, uint256 _amountIn, address _tokenOut, uint256 _minAmountOut) external",
]);

export default RouterABI;
