<p align="center">
  <img width="340" alt="Risedle Labs Monorepo logo" src="./risedle-monorepo.png">
</p>

<p align="center">
  <a aria-label="Risedle Website" href="https://risedle.com">
    <img src="https://badgen.net/badge/icon/Made%20By%20Risedle%20Labs?label&color=black&labelColor=black">
  </a>
</p>

## Get started

This monorepo uses [pnpm](https://pnpm.io/) and
[turborepo](https://turborepo.org/).

Use the following command to install `pnpm` on your macOS:

```sh
brew install pnpm
```

> **Note** See other installation method [here](https://pnpm.io/installation)

Clone the monorepo:

```sh
git clone git@github.com:risedle/monorepo.git
```

Then the next step is to setup git hooks via the following command:

```sh
cd monorepo/
pnpm install
```

The last step is to install dependencies of the project that you are working
on.

For example if you work on `@risedle/ui`, follow the following commands:

```
cd packages/ui/
pnpm install
```

Then you are ready to go. Happy hacking!

## Packages

List of available packages inside this monorepo:

| Package                                                | Latest Version                                                                                                                                                    | Description                                                       |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [@risedle/prettier-config](./packages/prettier-config) | <a href="https://www.npmjs.com/package/@risedle/prettier-config"> <img src="https://badgen.net/npm/v/@risedle/prettier-config?color=black&labelColor=black"> </a> | Shared [Prettier](https://prettier.io) configuration              |
| [@risedle/eslint-config](./packages/eslint-config)     | <a href="https://www.npmjs.com/package/@risedle/eslint-config"> <img src="https://badgen.net/npm/v/@risedle/eslint-config?color=black&labelColor=black"> </a>     | Shared [ESLint](https://eslint.org) configuration                 |
| [@risedle/tsconfig](./packages/tsconfig)               | <a href="https://www.npmjs.com/package/@risedle/tsconfig"> <img src="https://badgen.net/npm/v/@risedle/tsconfig?color=black&labelColor=black"> </a>               | Shared [TypeScript](https://www.typescriptlang.org) configuration |
| [@risedle/chains](./packages/chains)                   | <a href="https://www.npmjs.com/package/@risedle/chains"> <img src="https://badgen.net/npm/v/@risedle/chains?color=black&labelColor=black"> </a>                   | Utility to interact with the supported chains                     |
| [@risedle/quotes](./packages/quotes)                   | <a href="https://www.npmjs.com/package/@risedle/quotes"> <img src="https://badgen.net/npm/v/@risedle/quotes?color=black&labelColor=black"> </a>                   | Get the best swap quotes                                          |
| [@risedle/tokens](./packages/tokens)                   | <a href="https://www.npmjs.com/package/@risedle/tokens"> <img src="https://badgen.net/npm/v/@risedle/tokens?color=black&labelColor=black"> </a>                   | List of all verified tokens by Risedle labs                       |
| [@risedle/types](./packages/types)                     | <a href="https://www.npmjs.com/package/@risedle/types"> <img src="https://badgen.net/npm/v/@risedle/types?color=black&labelColor=black"> </a>                     | Shared type definitions                                           |
| [@risedle/ui](./packages/ui)                           | <a href="https://www.npmjs.com/package/@risedle/ui"> <img src="https://badgen.net/npm/v/@risedle/ui?color=black&labelColor=black"> </a>                           | Reusable React.js component library                               |

## Apps

List of available apps inside this monorepo:

| App                                  | Deployments                                                                                                                      | Description                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [apps/api](./apps/api)               | [api.risedle.com](https://api.risedle.com), [api.risedle.exchange](https://api.risedle.com)                                      | Serve Risedle blockhain data as REST API                            |
| [apps/assets](./apps/assets)         | [assets.risedle.com](https://assets.risedle.com)                                                                                 | Optimize and serve Risedle's static asssets                         |
| [apps/graph-node](./apps/graph-node) | [risedle-graph-node.internal:9000](http://risedle-graph-node.internal:9000)                                                      | Private [graph-node](https://thegraph.com) used to deploy subgraphs |
| [apps/interface](./apps/interface)   | [risedle.com](https://risedle.com), [bsc.risedle.com](https://bsc.risedle.com)                                                   | Risedle's Web3 App                                                  |
| [apps/ipfs](./apps/ipfs)             | [risedle-ipfs.internal:8080](http://risedle-ipfs.internal:8080), [risedle-ipfs.internal:5001](http://risedle-ipfs.internal:5001) | Private [IPFS](https://ipfs.tech/) node for subgraph deployments    |
| [apps/rebalancer](./apps/rebalancer) | n/a                                                                                                                              | Risedle's rebalancer bot                                            |

## Risedle Labs

-   [Risedle Labs Website](https://risedle.com)
-   [Risedle Labs Twitter](https://twitter.com/risedle)
-   [Risedle Labs Discord](https://discord.com/invite/YCSCd97SXj)
