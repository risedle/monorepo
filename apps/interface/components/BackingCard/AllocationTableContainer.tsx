import { BoxProps } from "@chakra-ui/react";

// Hooks
import useFuseLeveragedTokenInfo from "@/hooks/useFuseLeveragedTokenInfo";

// Sub-components
import BackingCardAllocationTable from "./AllocationTable";

interface BackingCardAllocationTableContainerProps extends BoxProps {
    symbol: string;
    collateralSymbol: string;
    debtSymbol: string;
}

export const BackingCardAllocationTableContainer = (
    props: BackingCardAllocationTableContainerProps
) => {
    const { symbol, collateralSymbol, debtSymbol, ...boxProps } = props;
    const { data, isLoaded } = useFuseLeveragedTokenInfo(symbol);

    // TODO(pyk): show toast when error happen

    return (
        <BackingCardAllocationTable
            collateralSymbol={collateralSymbol}
            debtSymbol={debtSymbol}
            collateralAmount={data?.collateral.amount || 0}
            debtAmount={data?.debt.amount || 0}
            collateralChangePercent={data?.collateral.changePercent || 0}
            debtChangePercent={data?.debt.changePercent || 0}
            isLoaded={isLoaded}
            {...boxProps}
        />
    );
};

export default BackingCardAllocationTableContainer;
