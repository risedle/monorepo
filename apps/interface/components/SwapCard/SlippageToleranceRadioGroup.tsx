/**
 * This is custom radio group for pre-defined slippage tolerance
 *
 * See docs here:
 * https://chakra-ui.com/docs/components/radio#custom-radio-buttons
 */
import { useRadioGroup, HStack } from "@chakra-ui/react";

// Sub-components
import SlippageToleranceRadio from "./SlippageToleranceRadio";

interface SlippageToleranceRadioGroupProps {
    slippage: string;
    slippages: Array<string>;
    setSlippage: (value: string) => void;
}

export const SlippageToleranceRadioGroup = (
    props: SlippageToleranceRadioGroupProps
) => {
    // Data
    const { slippage, slippages, setSlippage } = props;
    const { getRadioProps, getRootProps } = useRadioGroup({
        onChange: setSlippage,
        value: slippage,
    });

    return (
        <HStack
            data-testid="SlippageToleranceRadioGroup"
            gap={2}
            {...getRootProps()}
        >
            {slippages.map((slippage) => (
                <SlippageToleranceRadio
                    key={slippage}
                    slippage={slippage}
                    {...getRadioProps({ value: slippage })}
                />
            ))}
        </HStack>
    );
};

export default SlippageToleranceRadioGroup;
