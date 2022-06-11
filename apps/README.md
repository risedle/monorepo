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
cp -r cloudflare-workers-template new-app
```

Change `new-app` with the app name.

Update the `package.json` and you are ready to go.

