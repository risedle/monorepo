import NextImage from "next/image";
import { Box, useColorMode } from "@chakra-ui/react";

import { getBaseConfig } from "../../utils/getBaseConfig";

export const BackgroundGradient = () => {
    const { chainSlug } = getBaseConfig();
    const { colorMode } = useColorMode();

    return (
        <Box
            position="absolute"
            zIndex={-100}
            left="50%"
            transform="translate(-50%, 0)"
            marginTop="-600px"
            w="1000px"
            h="1000px"
        >
            <NextImage
                src={`/backgrounds/${chainSlug}-${colorMode}.png`}
                width="1000px"
                height="1000px"
            />
        </Box>
    );
};
