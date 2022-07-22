// TODO(pyk): refactor this chakra theming approach once we ready
// What we need:
// 1. Custom color based on chain
// 2. Custom color based on color mode
import { getBaseConfig } from "../utils/getBaseConfig";

const baseConfig = getBaseConfig();

const baseColors = {
    amber: {
        light: {
            11: "#AD5700",
        },
        dark: {
            11: "#F1A10D",
        },
    },
    red: {
        dark: {
            10: "#F2555A",
        },
    },
    sky: {
        dark: {
            10: "#8AE8FF",
        },
    },
    gray: {
        light: {
            1: "#FCFCFC",
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
    blue: {
        light: {
            1: "#FBFDFF",
        },
    },
    bsc: {
        chainIcon: "#F3BA2C",
        button: {
            bg: {
                light: "#CF8721",
                dark: "#EE9D2B",
            },
            border: {
                light: "#AC6D0D",
                dark: "#F3BA63",
            },
        },
    },
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

export default colors;
