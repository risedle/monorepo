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

### Deploy

Store the access token locally:

```sh
graph auth --product hosted-service <ACCESS_TOKEN>
```

then deploy the subgraph using the following command:

```sh
graph deploy --product hosted-service risedle/risedle-flt-bsc --network bsc
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
