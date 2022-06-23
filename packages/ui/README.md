## @risedle/ui

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

Don't forget to run `npm install` on monorepo root.

### Usage

Here is the example on how to use `@risedle/ui`:

```typescript
import { TrendingTokensBar, TrendingTokensBarContainer } from "@risedle/ui";
```

### Develop new component

Step by step to create new component:

1. Create new directory inside [src/components](./src/components). For example
   [src/components/TrendingTokensBar](./src/components/TrendingTokensBar).
2. Create new `presentational.tsx` inside the directory and write the
   presentational/stateless component. For example
   [src/components/TrendingTokensBar/presentational.tsx](./src/components/TrendingTokensBar/presentational.tsx).
3. (Optional) Create new `container.tsx` inside directory and write the
   container/stateful component. For example
   [src/components/TrendingTokensBar/container.tsx](./src/components/TrendingTokensBar/container.tsx).
4. Create new `index.tsx` inside the directory and import the presentational
   and container component (if any). For example
   [src/components/TrendingTokensBar/index.tsx](./src/components/TrendingTokensBar/index.tsx).

To test out the component, you need to create the stories inside the
[apps/storybook/stories](../../apps/storybook/stories). For example
[apps/storybook/stories/TrendingTokensBar.stories.tsx](../../apps/storybook/stories/TrendingTOkensBar.stories.tsx).

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
