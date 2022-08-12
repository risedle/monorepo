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

You need to create an account in bscscan in order to get the
`ETHERSCAN_API_KEY`.

Pin the recent block first to speed up the test:

```sh
export BLOCK_NUMBER=$(cast block-number --rpc-url https://bsc-dataseed1.binance.org)
```

Then execute the following command to run test against BSC mainnet:

```sh
forge test --fork-url https://bsc-dataseed1.binance.org \
           --fork-block-number $BLOCK_NUMBER \
           --match-path "test/bsc/*" \
           --etherscan-api-key ETHERSCAN_API_KEY \
           -vv
```

### Create new FLT

First thing first, run the script to configure the oracle. For example:

```sh
forge script ./script/CAKERISEConfigureOracle.s.sol \
    --interactives 1 \
    --sender 0xA8CD19675F8106Ba923F2B62816824d599593e3E \
    --rpc-url https://bsc-dataseed.binance.org \
    --etherscan-api-key HYFY76AWF4SFP98X2NE4EYZXBJ5SF8EM2M \
    --gas-estimate-multiplier 200 \
    --broadcast
```

Then create the token, for example:

```sh
forge script ./script/CAKERISECreate.s.sol \
    --interactives 1 \
    --sender 0x1418bE4753a22b69b613fA8B8144D856C023D46B \
    --rpc-url https://bsc-dataseed.binance.org \
    --etherscan-api-key HYFY76AWF4SFP98X2NE4EYZXBJ5SF8EM2M \
    --gas-estimate-multiplier 200 \
    --broadcast
```
