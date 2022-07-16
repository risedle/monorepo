## FLT Subgraph

This is a Risedle FLT subgraph.

### Endpoints

The subgraph is deployed in here:

| Network | The Graph                                                                    | Endpoint                                                        |
| ------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- |
| BSC     | [Link](https://thegraph.com/hosted-service/subgraph/risedle/risedle-flt-bsc) | https://api.thegraph.com/subgraphs/name/risedle/risedle-flt-bsc |

### Get started

You should run `npm install` on monorepo root.

Then you can run the following:

```sh
# generate the types
npm run codegen

# To run the test
npm run test
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
