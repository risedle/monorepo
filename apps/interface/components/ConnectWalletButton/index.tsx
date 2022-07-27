import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, BoxProps, Button } from "@chakra-ui/react";
import { getBaseConfig } from "@/utils/getBaseConfig";
import BlueIndicatorIcon from "../Icons/BlueIndicator";
import { RedIndicatorIcon } from "../Icons/RedIndicator";

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
