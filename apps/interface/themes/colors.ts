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
            2: "#291415",
            5: "#541B1F",
            10: "#F2555A",
            11: "#FF6369",
        },
        light: {
            10: "#DC3D43",
            11: "#CD2B31",
        },
    },
    green: {
        dark: {
            2: "#0C1F17",
            5: "#133929",
            8: "#236E4A",
            9: "#30A46C",
            10: "#3CB179",
            11: "#4CC38A",
            12: "#E5FBEB",
        },
        light: {
            1: "#FBFEFC",
            2: "#F2FCF5",
            8: "#5BB98C",
            9: "#30A46C",
            10: "#299764",
            11: "#18794E",
            12: "#153226",
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
            5: "#E8E8E8",
            6: "#E2E2E2",
            9: "#8F8F8F",
            10: "#858585",
            11: "#6F6F6F",
            12: "#171717",
        },
        dark: {
            1: "#161616",
            2: "#1C1C1C",
            3: "#232323",
            4: "#282828",
            5: "#2E2E2E",
            6: "#343434",
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
                light: "#EB9317",
                lighter: "#EC9F33",
                lightest: "#EDB76C",
                dark: "#EE9D2B",
                darker: "#DF8C18",
                darkest: "#C07813",
            },
            border: {
                light: "#D78913",
                lighter: "#EC9F33",
                dark: "#F3BA63",
                darker: "#EFA535",
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
