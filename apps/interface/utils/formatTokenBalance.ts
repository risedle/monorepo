const formatTokenBalance = (n: number): number => {
    return Math.floor(n * 1e5) / 1e5;
};

export default formatTokenBalance;
