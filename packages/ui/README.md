## Risedle UI

Risedle UI is a reusable [React.js](https://reactjs.org/) component library
that help us work together to build a great experience for all of our users.

Risedle UI goals are:

1. Create reusable UI components to accelerate frontend development.
2. Create UI consistency for all components within Risedle.

> **Warning** This library is still WIP. We are actively working on it. Our
> goal is to have an easy to use UI system. This includes an exhaustive
> documentation, improved DX, confidence in testing and a lot of refactoring to
> have consistency across our components.

### Get started

Use the following command to run storybook:

```sh
npm run storybook:start
```

> **Note** Make sure you have run `npm install` in the monorepo root.

> **Note** TODO(pyk): use `pnpm`

---

Reusable UI components (stateless and stateful) across Risedle Project.

-   **Stateless / Presentational Components**: Stateless or Presentational
    components are components that take props as input and return the DOM
    presentation, just like pure functions. There is no external interactions
    such as fetching data and keeping states.
-   **Stateful / Container Components**: Stateful or Container components are
    components that responsible to interact with external dependencies such as
    API and the UI logic.

One of the most common programming patterns in React is to use stateful parent
components to maintain their own state and pass it down to one or more
stateless child components as props.

Resources:

-   [Stateless Components From Stateful Components](https://www.codecademy.com/learn/react-component-state/modules/react-102-stateless-inherit-stateful-u/cheatsheet)
-   [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

### Install

```sh
npm install --save --save-exact @risedle/ui@latest
```

To install locally on another package inside this monorepo, use the following
syntax in the `package.json`:

```json
{
    "dependencies": {
        "@risedle/ui": "*"
    }
}
```

Don't forget to run `npm ci` & `npm run buil` on monorepo root.

### Usage

Here is the example on how to use `@risedle/ui`:

```typescript
import { TrendingTokensBar, TrendingTokensBarContainer } from "@risedle/ui";
```

### Develop new component

Step by step to create new component:

1. Start from storybook first and answer the following questions:
    - What is component for?
    - Is it stateless/presentational or stateful/container?
    - See example:
      [TrendingTokensBar](../../apps/storybook/stories/TrendingTokensBar.stories.mdx)
2. Create new implementation in [src/components](./src/components).
    - For stateless component, use `presentational.tsx` as the file name. For
      example
      [TrendingTokensBar/presentational.tsx](./src/components/TrendingTokensBar/presentational.tsx)
    - For stateful component, use `container.tsx` as the file name. For example
      [TrendingTokensBar/container.tsx](./src/components/TrendingTokensbar/container.tsx)
3. Iterate: Refine the story documentation and update the implementation.

Notes:

-   Please use minimal props as possible (e.g. Use optional props to define
    loading state instead of separate props field).

Run storybook locally to iterate the UI design faster:

```sh
# In monorepo root
npm run storybook
```

This will run two process in parallel:

-   Auto-build `@risedle/ui` on every changes
-   Auto-reload storybook server on evert changes

If your component story is not loaded in the Storybook, check the error on the
console.
