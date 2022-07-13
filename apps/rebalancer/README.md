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
tsc
```

Run the rebalancer:

```sh
node dist/cron.js
```

### Deployment

TODO(pyk): this rebalancer should be auto-deployed to fly.io
