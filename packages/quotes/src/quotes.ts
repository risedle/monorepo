import type { BigNumberish } from "@ethersproject/bignumber";

// Custom type for addy
type Address = string;

/**
 * QuoteRequest request object to interact with quotes API
 */
interface QuoteRequest {
    // ERC20 input token address
    tokenIn: Address;

    // ERC20 output token address
    tokenOut: Address;

    // The amount of tokenIn
    amountIn: BigNumberish;
}

export type { QuoteRequest };
