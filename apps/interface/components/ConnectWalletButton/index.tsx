import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, BoxProps, Button, Icon, IconProps } from "@chakra-ui/react";

import { getBaseConfig } from "../../utils/getBaseConfig";
import BlueIndicatorIcon from "../Icons/BlueIndicator";

// TODO(pyk): refactor this
const RedIndicatorIcon = (props: IconProps) => {
    return (
        <Icon
            data-testid="IndicatorIcon"
            viewBox="0 0 32 32"
            color="red.dark.10"
            {...props}
        >
            <g filter="url(#filter0_d_3427_171249)">
                <circle cx="16" cy="16.5" r="4" fill="currentColor" />
            </g>
            <defs>
                <filter
                    id="filter0_d_3427_171249"
                    x="0"
                    y="0.5"
                    width="32"
                    height="32"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.94902 0 0 0 0 0.333333 0 0 0 0 0.352941 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_3427_171249"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_3427_171249"
                        result="shape"
                    />
                </filter>
            </defs>
        </Icon>
    );
};

export const ConnectWalletButton = (props: BoxProps) => {
    const baseConfig = getBaseConfig();

    return (
        <Box data-testid="ConnectWalletButton" {...props}>
            <ConnectButton.Custom data-testid="NavigationBarConnectWallet">
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                }) => {
                    return (
                        <div
                            {...(!mounted && {
                                "aria-hidden": true,
                                style: {
                                    opacity: 0,
                                    pointerEvents: "none",
                                    userSelect: "none",
                                },
                            })}
                        >
                            {(() => {
                                if (!mounted || !account || !chain) {
                                    return (
                                        <Button
                                            onClick={openConnectModal}
                                            variant={baseConfig.chainSlug}
                                            width="100%"
                                        >
                                            Connect Wallet
                                        </Button>
                                    );
                                }
                                if (chain.unsupported) {
                                    return (
                                        <Button
                                            width="100%"
                                            onClick={openChainModal}
                                            leftIcon={
                                                <RedIndicatorIcon
                                                    w="6"
                                                    h="6"
                                                />
                                            }
                                        >
                                            Switch Network
                                        </Button>
                                    );
                                }
                                return (
                                    <Button
                                        onClick={openAccountModal}
                                        leftIcon={
                                            <BlueIndicatorIcon w="6" h="6" />
                                        }
                                        width="100%"
                                    >
                                        {account.displayName}
                                    </Button>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </Box>
    );
};
