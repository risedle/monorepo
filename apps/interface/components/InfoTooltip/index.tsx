import {
    IconProps,
    useColorModeValue,
    Tooltip,
    Center,
} from "@chakra-ui/react";

// Sub-components
import InfoIcon from "../Icons/Info";

interface InfoTooltipProps extends IconProps {
    info: string;
}

export const InfoTooltip = (props: InfoTooltipProps) => {
    // Data
    const { info } = props;

    // Styles
    const gray2 = useColorModeValue("gray.light.2", "gray.dark.2");
    const gray12 = useColorModeValue("gray.light.12", "gray.dark.12");

    return (
        <Tooltip
            label={info}
            placement="top"
            background={gray12}
            color={gray2}
            boxShadow="none"
            data-testid="InfoTooltip"
            fontSize="sm"
            lineHeight="4"
            borderRadius="lg"
        >
            {/**
             * NOTE: need to wrap the Icon with span.
             * See issue here: https://github.com/chakra-ui/chakra-ui/issues/2869
             */}
            <span style={{ margin: 0, height: "16px" }}>
                <Center>
                    <InfoIcon
                        data-testid="InfoTooltipIcon"
                        w="4"
                        h="4"
                        _hover={{ cursor: "pointer" }}
                        {...props}
                    />
                </Center>
            </span>
        </Tooltip>
    );
};

export default InfoTooltip;
