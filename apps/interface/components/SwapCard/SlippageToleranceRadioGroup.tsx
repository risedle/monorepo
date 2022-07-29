/**
 * This is custom radio group for pre-defined slippage tolerance
 *
 * See docs here:
 * https://chakra-ui.com/docs/components/radio#custom-radio-buttons
 */
import { useRadioGroup, HStack } from "@chakra-ui/react";

// Sub-components
import SlippageToleranceRadio from "./SlippageToleranceRadio";

interface SlippageToleranceRadioGroup {
    defaultSlippage: string;
    slippages: Array<string>;
    onChange: (value: string) => void;
}

export const SlippageToleranceRadioGroup = (
    props: SlippageToleranceRadioGroupProps
) => {
    // Data
    const { defaultSlippage, slippages, onChange } = props;
    const { getRadioProps, getRootProps } = useRadioGroup({
        defaultValue: defaultSlippage,
        onChange,
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
