import { BoxProps, Box, useColorModeValue } from "@chakra-ui/react";

import getBaseConfig from "@/utils/getBaseConfig";

interface BackgroundGradientProps extends BoxProps {
    page: string; // 'home', 'trade' etc
}

const BackgroundGradient = (props: BackgroundGradientProps) => {
    const { chainSlug } = getBaseConfig();
    const { page, ...boxProps } = props;

    const bg = useColorModeValue(
        `url(/backgrounds/${page}-${chainSlug}-light.png)`,
        `url(/backgrounds/${page}-${chainSlug}-dark.png)`
    );

    return (
        <Box
            data-testid="BackgroundGradient"
            data-chainslug={chainSlug}
            backgroundImage={bg}
            backgroundRepeat="no-repeat"
            backgroundPosition="center top"
            position="absolute"
            top="0"
            width="100%"
            height="100%"
            zIndex="-99999"
            {...boxProps}
        />
    );
};

export default BackgroundGradient;
