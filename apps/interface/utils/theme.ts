import { extendTheme } from "@chakra-ui/react";
import type { StyleConfig } from "@chakra-ui/theme-tools";
import { getBaseConfig } from "../utils/getBaseConfig";

// TODO(pyk): refactor this chakra theming approach once we ready
// What we need:
// 1. Custom color based on chain
// 2. Custom color based on color mode

const baseConfig = getBaseConfig();

// TODO: use Chain ID

const baseColors = {
    amber: {
        light: {
            11: "#AD5700",
        },
        dark: {
            11: "#F1A10D",
        },
    },
    gray: {
        light: {
            2: "#F8F8F8",
            3: "#F3F3F3",
            4: "#EDEDED",
            9: "#8F8F8F",
            10: "#858585",
            11: "#6F6F6F",
            12: "#171717",
        },
        dark: {
            2: "#1C1C1C",
            3: "#232323",
            4: "#282828",
            9: "#707070",
            10: "#7E7E7E",
            11: "#A0A0A0",
            12: "#EDEDED",
        },
    },
    bsc: "#F3BA2C",
};

const warningBarDividerColors: Record<string, Record<string, string>> = {
    light: {
        bsc: baseColors.amber.light["11"],
    },
    dark: {
        bsc: baseColors.amber.dark["11"],
    },
};

const colors = {
    ...baseColors,
    warningBar: {
        active: {
            light: warningBarDividerColors.light[baseConfig.chainSlug],
            dark: warningBarDividerColors.dark[baseConfig.chainSlug],
        },
        base: {
            light: baseColors.gray.light["11"],
            dark: baseColors.gray.dark["11"],
        },
    },
};

// TODO(pyk): refactor this custom button

// 1. define component configuration
const components: Record<string, StyleConfig> = {
    Button: {
        variants: {
            solid: ({ colorMode }) => ({
                background:
                    colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
                borderColor:
                    colorMode == "dark" ? "gray.dark.4" : "gray.light.4",
                borderWidth: "1px",
                color: colorMode == "dark" ? "gray.dark.12" : "gray.light.12",
                fontWeight: "semibold",
                fontSize: "sm",
                lineHeight: "4",
                borderRadius: "full",
                _hover: {
                    background:
                        colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
                },
                _active: {
                    background:
                        colorMode == "dark" ? "gray.dark.2" : "gray.light.2",
                },
            }),
        },
    },
};

// Breakpoints
const breakpoints = {
    tablet: "640px", // => @media (min-width: 640px) { ... }
    laptop: "1024px", // => @media (min-width: 1024px) { ... }
    desktop: "1280px", // => @media (min-width: 1280px) { ... }
};

const theme = extendTheme({
    components,
    colors,
    breakpoints,
    ronts: {
        body: '"Inter", sans-serif;',
    },
    config: {
        cssVarPrefix: "risedle",
    },
    initialColorMode: "dark",
    useSystemColorMode: false,
});

export default theme;
