## Risedle Apps

Welcome to the home of all Risedle Apps!

Risedle App is a standalone and deployable application that powers the
functionalities of the Risedle Ecosystem.

### Create new app

The app should written in Typescript and use one of the following stacks:

1. [Next.js](https://nextjs.org/) App
2. [Cloudflare Workers](https://workers.cloudflare.com/)
3. [Express.js](https://expressjs.com/) App

These basic requirements are used to ensure that we can transfer knowledge
between engineers easily and it's designed that one-man can handle all the apps.

All app should have `package.json` with the following settings:

1.  `private` is set to `true`
2.  have the following scripts: `dev`, `build`, `start` and `lint`

For example:

```
...
    "private": true,
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
...
```

The `tsconfig.json` should extends one of the config in
[packages/tsconfig/](../packages/tsconfig).

### Cloudflare Workers

To create new Cloudflare Workers app, go to `apps/` directory then run the
following command:

```sh
npm init cloudflare new-app https://github.com/mrbbot/miniflare-typescript-esbuild-jest
```

Change `new-app` with the app name.

Then delete the git directory inside new app:

```sh
rm -rf new-app/.git
```

Replace `tsconfig.json`:

```sh
cp exchange-api/tsconfig.json new-app/tsconfig.json
```

Update the `package.json` title, description and the author and the
dependencies.

Done. You are ready to develop.
