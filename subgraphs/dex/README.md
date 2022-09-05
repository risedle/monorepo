## Risedle DEX Subgraph

Source code of Risedle Exchange subgraph. This subgraph index various
activities on Uniswap V3, SushiSwap and Curve.

### Endpoints

The subgraph is deployed in here:

| Network  | Endpoint |
| -------- | -------- |
| Arbitrum | n/a      |

### Get started

You should run `npm install` on monorepo root.

Then you can run the following:

```sh
# Generate subgraph.yaml for protocol on specific chain
npm run yamlgen --protocol=uniswap-v3 --network=arbitrum-one

# Generate the types
npm run codegen

# Generate constants of the protocol on specific chain
npm run constgen --protocol=uniswap-v3 --network=arbitrum-one

# Build the subgraph
npm run graph:build

# To run the test
npm run graph:test

# Run test individually
npm run graph:test -- flt
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
npm run graph:create --network=arbitrum-one --protocol=uniswap-v3
```

Then deploy the subgraph:

```sh
npm run graph:deploy --network=arbitrum-one --protocol=uniswap-v3
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
