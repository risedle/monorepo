## Risedle DEX Subgraph

Source code of Risedle Exchange subgraph. This subgraph index various
activities on Uniswap V3, SushiSwap and Curve.

### Endpoints

The subgraph is deployed in here:

| Network  | Endpoint |
| -------- | -------- |
| Arbitrum | n/a      |

### Get started

Run the following command to install the dependencies:

```bash
pnpm install
```

Then you can run the following:

```sh
# Generate subgraph.yaml for protocol on specific chain
pnpm --config.protocol=uniswap-v3 --config.network=arbitrum-one yamlgen

# Generate the types
pnpm codegen

# Generate constants of the protocol on specific chain
pnpm --config.protocol=uniswap-v3 --config.network=arbitrum-one constgen

# Build the subgraph
pnpm graph:build

# To run the test
pnpm graph:test

# Run test individually
pnpm graph:test uniswap-v3/handlepoolcreated
```

### Liquidity Pool Creation

Liquidity Pool is created using
[createLiquidityPool](./shared/entities/createLiquidityPool.ts) function.

Each protocol must provide the following data in order to create new pool:

| Name             | Type                  | Description                                       |
| ---------------- | --------------------- | ------------------------------------------------- |
| `poolName`       | `string`              | Pool's name (e.g. "Uniswap V3 USDC/WETH 0.3%")    |
| `poolSlug`       | `string`              | Pool's slug (e.g. "uniswap-v3-usdc-weth-0.3")     |
| `tokenCount`     | `i32`                 | Number of tokens in the pool (e.g. 2)             |
| `tokenAddresses` | `Array<Address>`      | Array of token address                            |
| `tokenWeights`   | `Array<BigDecimal>`   | Array of token weight                             |
| `lpFee`          | `BigDecimal`          | Percentage fee received by LP provider (e.g. 0.3) |
| `protocolFee`    | `BigDecimal`          | Percentage fee received by Protocol               |
| `swapFee`        | `BigDecimal`          | Total fee per swap (lp + protocol)                |
| `block`          | `Block`               | Block object when pool is created                 |
| `transaction`    | `Transaction`         | Transaction when pool is created                  |
| `receipt`        | `TransasctionReceipt` | Transaction receipt                               |

> **INFO**: Learn more about types
> [here](https://thegraph.com/docs/en/developing/assemblyscript-api/#ethereum-api)

Notes:

-   If there is protocol fee switch, it will handled directly in the mapping
    based on the `event.block.number`

### Deploy

> **IMPORTANT**: Make sure you are connected to Risedle private network

Create the subgraph first using the following command:

```sh
pnpm --config.protocol=uniswap-v3 --config.network=arbitrum-one graph:create
```

Then deploy the subgraph:

```sh
pnpm --config.protocol=uniswap-v3 --config.network=arbitrum-one graph:deploy
```

### Integrate Protocol

Here is step by step to integrate new dex:

1. Add ABI to `abis/protocol-name`
2. Create new `configs`, `templates` and `handlers` inside
   `protocols/protocol-name`.

TODO(pyk): elaborate on this

### Useful links

-   [Get Started with The Graph](https://thegraph.com/docs/en/)
-   [The Graph - Unit Testing Framework](https://thegraph.com/docs/en/developer/matchstick/)
-   [MatchStick Example](https://github.com/LimeChain/demo-subgraph#readme)
