import { HStack, Button, useColorModeValue, Text } from "@chakra-ui/react";

// Icons
import MagicWandIcon from "@/components/Icons/MagicWand";

// Utils
import getBaseConfig from "@/utils/getBaseConfig";

interface SwapCardMaxButtonProps {
    onClick: () => void;
}

export const SwapCardMaxButton = (props: SwapCardMaxButtonProps) => {
    // Data
    const { chainSlug } = getBaseConfig();
    const { onClick } = props;

    // Styles
    const accent = useColorModeValue(
        `${chainSlug}.button.bg.light`,
        `${chainSlug}.button.bg.dark`
    );

    return (
        <Button
            variant="link"
            _hover={{ textDecoration: "none" }}
            margin="0 !important"
            onClick={onClick}
            data-testid="SwapCardMaxButton"
        >
            <HStack gap={2}>
                <MagicWandIcon w="4" h="4" color={accent} />
                <Text
                    fontSize="sm"
                    lineHeight="4"
                    fontWeight="semibold"
                    color={accent}
                    margin="0 !important"
                >
                    Max
                </Text>
            </HStack>
        </Button>
    );
};

export default SwapCardMaxButton;
