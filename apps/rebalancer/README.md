## Risedle FLT Rebalancer Bot

This bot monitor profitable rebalancing opportunities every minute and trigger
rebalance if needed.

### Get started

To install the dependencies, run the following command:

```shell
pnpm install
```

> **Note** If you want to contribute to this project, make sure you have run
> installation from the monorepo root in order to setup git hooks etc.

Copy `.env.example` to `.env` and modify the values.

### Run

Build the rebalancer:

```sh
pnpm build
```

Run the rebalancer:

```sh
node dist/cron.js
```

### Deployment

This bot is automatically deployed to
[fly.io](https://fly.io/docs/introduction/) via GitHub Workflow.

To create deployment on new chain, you need to create new Fly app first.

To create new Fly app, run the following command:

```sh
flyctl launch
```

Given the app name using the following format: `rebalancer-$CHAIN`. For example
`rebalancer-bsc`.

Next step is to set the secrets.

Run the following command to create the secrets:

```sh
flyctl secrets --app APP_NAME set RPC_URL="" WALLET_PK="" SENTRY_DSN="" FLTS="" MIN_PROFITS=""
```

Then you need to setup automatic deployment by adding deployment job in
[apps-rebalancer-prod.yml](../../.github/workflows/apps-rebalancer-prod.yml).
