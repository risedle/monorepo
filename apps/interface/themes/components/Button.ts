/**
 * <Button /> Variants
 */

const ButtonSolid = ({ colorMode }: { colorMode: string }) => ({
    background: colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
    borderColor: colorMode == "dark" ? "gray.dark.4" : "gray.light.4",
    borderWidth: "1px",
    color: colorMode == "dark" ? "gray.dark.12" : "gray.light.12",
    fontWeight: "semibold",
    fontSize: "sm",
    lineHeight: "4",
    borderRadius: "full",
    _hover: {
        background: colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
    },
    _active: {
        background: colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
    },
});

const ButtonIcon = ({ colorMode }: { colorMode: string }) => ({
    background: colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
    borderColor: colorMode == "dark" ? "gray.dark.4" : "gray.light.4",
    borderWidth: "1px",
    color: colorMode == "dark" ? "gray.dark.12" : "gray.light.12",
    fontWeight: "semibold",
    fontSize: "sm",
    lineHeight: "4",
    borderRadius: "full",
    padding: 0,
    _hover: {
        background: colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
    },
    _active: {
        background: colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
    },
});

const ButtonBSC = ({ colorMode }: { colorMode: string }) => ({
    background:
        colorMode == "dark" ? "bsc.button.bg.dark" : "bsc.button.bg.light",
    borderColor:
        colorMode == "dark"
            ? "bsc.button.border.dark"
            : "bsc.button.border.light",
    borderWidth: "1px",
    color: colorMode == "dark" ? "blue.light.1" : "gray.light.1",
    fontWeight: "semibold",
    fontSize: "sm",
    lineHeight: "4",
    borderRadius: "full",
    _hover: {
        background:
            colorMode == "dark" ? "bsc.button.bg.dark" : "bsc.button.bg.light",
    },
    _active: {
        background:
            colorMode == "dark" ? "bsc.button.bg.dark" : "bsc.button.bg.light",
    },
});

const ButtonGradient = ({ colorMode }: { colorMode: string }) => ({
    backgroundImage:
        colorMode == "dark"
            ? `radial-gradient(
                                91.36% 358.74% at 12.29% 100%,
                                #c9bbff 0%,
                                #b2ecff 30.08%,
                                #ffc1f9 60.28%,
                                #fff5c1 100%
                            );`
            : `radial-gradient(
                            91.36% 358.74% at 12.29% 100%,
                            #9d85ff 0%,
                            #7ad4f0 30.08%,
                            #f554e5 60.28%,
                            #e7cf55 100%
                        );`,
    color: colorMode == "dark" ? "gray.light.12" : "gray.light.1",
    px: "6",
    py: "3",
    fontWeight: "semibold",
    fontSize: "sm",
    lineHeight: "4",
    borderRadius: "full",
});

const Button = {
    variants: {
        solid: ButtonSolid,
        icon: ButtonIcon,
        bsc: ButtonBSC,
        gradient: ButtonGradient,
    },
};

export default Button;
