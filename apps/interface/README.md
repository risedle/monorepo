## Risedle Interface

Risedle Interface is a Web3 app that deployed specificly for each chain.

TODO(pyk): Add docs about how to run here

### Table of contents

-   [Data Fetching Strategy](#data-fetching-strategy)
-   [Known Issues](#known-issues)
-   [Development Resources](#development-resources)
-   [Testing Resources](#testing-resources)
-   [Deployment](#deployment)

### Data Fetching Strategy

To increase the performance, we will use the following data fetching
strategies:

1. **Server side**: Pre-render historical data such as historical volumes,
   prices, backings and so on.
2. **Client side**: Fetch only latest data such as latest price.

To accomplish this, we will use
[Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration).

### Known Issues

#### Responsive Styles

Use css breakpoints intead of `useMediaQuery` or any other Chakra UI component
that use that hooks (ex: `<Show />`).

If you use `useMediaQuery` it will have a problem called
[Flash of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
which shift the layout on rendering.

When we use css breakpoints, Next.js will pre-render the component and the FOUC
problem will be prevented.

#### Dark Mode

Chakra UI have known flashing issue for their
[Color Mode](https://chakra-ui.com/docs/styled-system/color-mode#color-mode-flash-issue).

Our current solution is to set the initial theme to light instead of dark to
prevent flash issue for all users by default.

### Development Resources

-   [Chakra UI - Style Props](https://chakra-ui.com/docs/styled-system/style-props)
-   [Chakra UI - Create custom SVG Icon Component](https://chakra-ui.com/docs/components/icon#creating-your-custom-icons)

### Testing Resources

-   [How to test custom React hooks](https://kentcdodds.com/blog/how-to-test-custom-react-hooks)

### Upgrading internal dependencies

Run the following command to update the internal packages:

```sh
npm i --save --save-exact @risedle/types@latest -w=interface
```

### Deployment

Risedle Interface will be deployed on each chain when the pull request is
merged on main branch.

| Network | URL                     |
| ------- | ----------------------- |
| BSC     | https://bsc.risedle.com |

Risedle Interface is hosted on [fly.io](https://fly.io/).

To deploy Risedle Interface to a new chain, follow the step by step below.

Create new fly app:

```
fly launch
```

use the following name format: `risedle-interface-CHAINSLUG`.

Then set the environment variable:

```
NEXT_PUBLIC_CHAIN_SLUG="polygon"
```

Then create new workflow. see `bsc-prod.yml` workflow for example.
