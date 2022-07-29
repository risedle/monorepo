export function parseSlippageTolerance(
    setSlippage: (slippage: string) => void
): (slippage: string) => void {
    return (value: string) => {
        const slippage = value.replace(",", ".");
        setSlippage(slippage);
    };
}

export default parseSlippageTolerance;
