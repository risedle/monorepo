## Risedle Graph Node

This is source code of
[graph-node](https://github.com/graphprotocol/graph-node) that deployed inside
Risedle's private network.

### Setup

Create new app by running the following command:

```sh
fly launch
```

Set the secrets:

```sh
fly secrets set \
  postgres_host="risedle-postgres.internal" \
  postgres_port="5432" \
  postgres_user="postgres" \
  postgres_pass="" \
  postgres_db="graph_node" \
  ipfs="risedle-ipfs.internal:5001" \
  ethereum="mainnet:https://rpc.ankr.com/eth xdai:https://rpc.ankr.com/gnosis matic:https://rpc.ankr.com/polygon optimism:https://rpc.ankr.com/optimism arbitrum-one:https://rpc.ankr.com/arbitrum avalanche:https://rpc.ankr.com/avalanche bsc:https://rpc.ankr.com/bsc"
```

Deploy:

```sh
fly deploy
```

The graph node will be accessible via the following url:

-   GraphiQL `http://appname.internal:9000`
-   HTTP: `http://appname.internal:9000/subgraphs/name/<subgraph-name>`
-   WebSocket: `ws://appname.internal:8001/subgraphs/name/<subgraph-name>`
-   Admin JSON-RPC (for subgraph deployment): `http://appname.internal:9020`
-   Index node server: `http://appname.internal:9030`
-   Metrics server: `http://appname.internal:9040`
