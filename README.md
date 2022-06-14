# Risedle Monorepo

This monorepo is created using [turborepo](https://turborepo.org/).

## What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It
includes the following packages/apps:

### Apps and Packages

-   `docs`: a [Next.js](https://nextjs.org) app
-   `web`: another [Next.js](https://nextjs.org) app
-   `ui`: a stub React component library shared by both `web` and `docs`
    applications
-   `eslint-config-custom`: `eslint` configurations (includes
    `eslint-config-next` and `eslint-config-prettier`)
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting

## Setup

This repository is used in the `npx create-turbo@latest` command, and selected
when choosing which package manager you wish to use with your monorepo (npm).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
npm run dev
```

## Useful Links

Learn more about the power of Turborepo:

-   [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
-   [Caching](https://turborepo.org/docs/core-concepts/caching)
-   [Remote Caching (Beta)](https://turborepo.org/docs/core-concepts/remote-caching)
-   [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
-   [Configuration Options](https://turborepo.org/docs/reference/configuration)
-   [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
