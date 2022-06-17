## Risedle Storybook

This is standalone application to run build storybook static page.

To start the development run the following command:

```sh
npm run storybook
```

To create new component:

1. Go to [@risedle/ui](../packages/ui)
2. Create new `tsx` component file
3. Create new stories in here

### Preview Deployment

On every pull request that changes `apps/storybook/**` and `packages/ui/**` will
automatically deploy this app.

To get the preview URL go to
[GitHub Deployments](https://github.com/risedle/monorepo/deployments).
