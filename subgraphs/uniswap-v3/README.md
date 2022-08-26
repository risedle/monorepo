## Risedle Exchange Subgraph

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
# generate the types
npm run codegen

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

### Useful links

-   [Get Started with The Graph](https://thegraph.com/docs/en/)
-   [The Graph - Unit Testing Framework](https://thegraph.com/docs/en/developer/matchstick/)
-   [MatchStick Example](https://github.com/LimeChain/demo-subgraph#readme)
