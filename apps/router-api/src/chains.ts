enum Chain {
    Mainnet = 1,
    Arbitrum = 42161,
}

interface DEX {
    name: string;
}

const uniswapV2: DEX = {
    name: "Uniswap V2",
};

const sushiswap: DEX = {
    name: "Sushiswap",
};

const curveV1: DEX = {
    name: "Curve V1",
};

const dexs = {};
dexs[Chain.Mainnet] = [uniswapV2, sushiswap, curveV1];
dexs[Chain.Arbitrum] = [sushiswap, curveV1];

function getSupportedDexs(chainId: string): Array<DEX> {
    return dexs[chainId];
}

export { Chain, getSupportedDexs };
