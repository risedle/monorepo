## Risedle Router API

Risedle Router API is an API service that provides the most efficient way to
swap token A for token B.

Under the hood, the Risedle Router API performs three tasks:

1. Queries prices from multiple DEXs and aggregates the results to provide the
   best price possible.
2. Split order to multiple DEXs to maximize the overall return of the swap.
3. Build a transaction that can be executed onchain using any javascript
   library.

### Development

Risedle Router API is deployed to
[Cloudflare Workers](https://workers.cloudflare.com/). It uses
[Miniflare](https://github.com/cloudflare/miniflare) for local development,
[TypeScript](https://www.typescriptlang.org/),
[esbuild](https://github.com/evanw/esbuild) for bundling, and
[Jest](https://jestjs.io/) for testing, with
[Miniflare's custom Jest environment](https://miniflare.dev/testing/jest).

Run the following command in the monorepo root:

```shell
# Install dependencies
$ npm install

# Start local development server with live reload
$ npm run dev

# Run tests
$ npm test
```

### Deployment

The `main` branch is automatically deployed to production and can be accessed
via the following url:

```
https://router.risedle.com
```

All pull request are automatically tested and deployed to staging and can be
accessed via the following URL:

```
https://router-staging.risedle.com
```

### Usage

Risedle Router API expose the following endpoints:

```
GET /v1/chains
GET /v1/:chainID/dexs
GET /v1/:chainID/route?:params
```

#### GET /v1/chains

It returns 200 OK and the following JSON object:

```json
{
    "chains": [1, 41261, ...]
}
```

#### GET /v1/:chainID/dexs

Example:

```
# ETH Mainnet
https://router.risedle.com/1/dexs

# Arbitrum
https://router.risedle.com/41261/dexs
```

If `chainID` is not supported then it will returns 404 Not Found with the
following JSON object:

```json
{
    "message": "Chain not supported"
}
```

If `chainID` is supported then it will returns 200 OK with the following JSON
object:

```json
{
    "sources": ["uniswapV3", "sushiswap", ...]
}
```

#### GET /v1/:chainID/route?:params

Params:

-   `tokenIn` The address of token in. It can be `ETH` or any ERC20 address.
-   `tokenOut` The address of token out. It can be `ETH` or any ERC20 address.
-   `amountIn` The amount of token in.

Example:

```
# Find best way to swap 100 USDC to ETH
https://router.risedle.com/1/route?tokenIn=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&tokenOut=ETH&amountIn=100000000
```

If `chainID` is not supported then it will returns 404 Not Found with the
following JSON object:

```json
{
    "message": "Chain not supported"
}
```

If `chainID` is supported then it will returns the following:

If there is no liquidity of `tokenIn` or `tokenOut` in supported dexs, it will
returns 404 Not Found with the following JSON object:

```json
{
    "message": "Unable to find liquidity for pair",
    "params": {
        "tokenIn": "[address of token in]",
        "tokenOut: "[address of token out]",
    }
}
```

If there is liquifity to swap `tokenIn` for `tokenOut`, it will returns 200 OK
with the following JSON object:

```json
{
    "price": xxx,
    "guarantedPrice": xxx,
    "amountOut": xxx,
    "guarantedAmountOut": xxx,
    "to": address
}
```

### Algorithm

TODO(pyk): Add algorithm here
