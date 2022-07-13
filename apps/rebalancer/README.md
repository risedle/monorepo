## Risedle FLT Rebalancer Bot

This bot monitor profitable rebalancing opportunities every minute and trigger
rebalance if needed.

### Get started

Clone the repository & install the dependencies:

```sh
git clone https://github.com/risedle/monorepo.git
cd monorepo/
npm install -w=rebalancer
cd apps/rebalancer/
```

Copy `.env.example` to `.env` and modify the values.

### Run

Build the rebalancer:

```sh
npm run build
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

Next step is to setup automatic deployment.

Copy [rebalancer-bsc.yml](../../.github/workflows/rebalancer-bsc.yml) to new
chain then update the `name`, the `paths`, and `flyctl` command line argument.
