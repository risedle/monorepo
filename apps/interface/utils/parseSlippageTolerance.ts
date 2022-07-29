export function parseSlippageTolerance(
    setSlippage: (slippage: string) => void
): (slippage: string) => void {
    // test
    return (value: string) => {
        const slippage = value.replace(",", ".");
        setSlippage(slippage);
    };
}

export default parseSlippageTolerance;
