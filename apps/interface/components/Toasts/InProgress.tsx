import { HStack, Text, useColorModeValue, Circle } from "@chakra-ui/react";

// Icons
import DotsIcon from "@/components/Icons/Dots";

// Props
interface InProgressToastProps {
    text: string;
}

export const InProgressToast = (props: InProgressToastProps) => {
    const { text } = props;

    // Styles
    const bg = useColorModeValue("green.light.9", "green.dark.2");
    const border = useColorModeValue("green.light.10", "green.dark.5");
    const textColor = useColorModeValue("green.light.1", "green.dark.12");

    return (
        <HStack
            background={bg}
            border="1px"
            borderColor={border}
            borderRadius="full"
        >
            <Circle background={border} p="2" marginLeft="2">
                <DotsIcon w="4" h="4" color={textColor} />
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

export default InProgressToast;
