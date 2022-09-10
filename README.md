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

See other installation method [here](https://pnpm.io/installation).

Then the next step is to setup git hooks via the following command:

```sh
pnpm install
```

Then the next step is to install only dependencies of the project that you are
working on.

For example if you work on `@risedle/ui`, follow the following commands:

```
cd packages/ui/
pnpm install
```

Then you are ready to go.

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

### Your Monorepomap

Looking at a bunch of directories and source codes can be intimidating
sometimes. Luckily we have provided minimap to accompany your contribution
journey:

![Risedle Labs Monorepomap](./map.png)

-   **[apps](./apps)** is a home of all standalone and deployable apps that
    created by Risedle Labs team.
-   **[packages](./packages)** is a home of all libraries that used across
    projects created by Risedle Labs team.

### Useful Links

-   [Getting Started with npm Workspaces](https://ruanmartinelli.com/posts/npm-7-workspaces-1)
-   [Monorepo Setup with NPM and TypeScript](https://javascript.plainenglish.io/monorepo-setup-with-npm-and-typescript-90b329ba7275)

### Risedle Labs

-   [Risedle Labs Website](https://risedle.com)
-   [Risedle Exchange Website](https://risedle.exchange)
-   [Risedle Exchange Storybook](https://storybook.risedle.exchange)
-   [Risedle Labs Twitter](https://twitter.com/risedle)
-   [Risedle Labs Discord](https://discord.com/invite/YCSCd97SXj)
