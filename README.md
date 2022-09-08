<p align="center">
  <img width="340" alt="Risedle Labs Monorepo logo" src="./risedle-monorepo.png">
</p>

<p align="center">
  <a aria-label="Risedle Website" href="https://risedle.com">
    <img src="https://badgen.net/badge/icon/Made%20By%20Risedle%20Labs?label&color=black&labelColor=black">
  </a>
</p>

### Get started

Welcome to Risedle Labs Monorepo!

This repository is a home of all Risedle Labs source code. We love to build on
public.

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
