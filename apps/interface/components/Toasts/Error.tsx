import { HStack, Text, useColorModeValue, Circle } from "@chakra-ui/react";

// Icons
import WarningIcon from "@/components/Icons/Warning";

// Props
interface ErrorToastProps {
    text: string;
}

export const ErrorToast = (props: ErrorToastProps) => {
    const { text } = props;

    // Styles
    const bg = useColorModeValue("red.light.9", "red.dark.2");
    const border = useColorModeValue("red.light.10", "red.dark.5");
    const textColor = useColorModeValue("red.light.1", "red.dark.12");
    const iconColor = useColorModeValue("", "red.dark.11");

    return (
        <HStack
            data-testid="ErrorToast"
            margin="auto"
            background={bg}
            border="1px"
            borderColor={border}
            borderRadius="full"
            width="max-content"
        >
            <Circle background={border} p="2" marginLeft="2">
                <WarningIcon w="4" h="4" color={iconColor} />
            </Circle>
            <Text
                color={textColor}
                fontSize="xs"
                lineHeight="4"
                fontWeight="semibold"
                paddingY="4"
                paddingRight="4"
            >
                {text}
            </Text>
        </HStack>
    );
};

export default ErrorToast;
