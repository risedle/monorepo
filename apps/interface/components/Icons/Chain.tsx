import { IconProps } from "@chakra-ui/react";

import { getBaseConfig } from "../../utils/getBaseConfig";
import ChainBSCIcon from "./ChainBSC";
import ChainArbitrumIcon from "./ChainArbitrum";

interface ChainIconProps extends IconProps {
    chainId?: number;
}

export const ChainIcon = (props: ChainIconProps) => {
    const { chainId, ...iconProps } = props;
    const baseConfig = getBaseConfig();
    const currentChainId = chainId ? chainId : baseConfig.chainId;

    // TODO: import ChainID types here from @risedle/types
    switch (currentChainId) {
        case 56:
            return <ChainBSCIcon {...iconProps} />;
        case 42161:
            return <ChainArbitrumIcon {...iconProps} />;
        default:
            return <div data-testid="ChainIconDefault">DEFAULT ICON</div>;
    }
};

export default ChainIcon;
