## Fuse Leveraged Token

Leveraged Token powered by Fuse Pool.

### Setup

Install the latest version of
[foundry](https://github.com/foundry-rs/foundry#installation).

Clone the monorepo:

```sh
git clone https://github.com/risedle/monorepo.git
```

Install the monorepo dependencies:

```sh
cd monorepo/
npm install
```

Install the `flt` dependencies:

```sh
cd contracts/flt/
forge install
```

### Build

In order to build the `flt`, run the following command:

```sh
forge build
```

### Test

Execute the following command to run test against BSC mainnet:

```sh
forge test --fork-url https://bsc-dataseed1.binance.org \
           --fork-block-number BLOCK_NUMBER \
           --match-path "test/bsc/*" \
           --etherscan-api-key ETHERSCAN_API_KEY \
           -vv
```

Get the latest `BLOCK_NUMBER` via [bscscan](https://bscscan.com/).

You need to create an account in bscscan in order to get the
`ETHERSCAN_API_KEY`.
