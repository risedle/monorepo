import { create } from "@storybook/theming";

export default create({
    base: "dark",

    // Brand
    brandTitle: "Risedle UI",
    brandUrl: "https://risedle.com",
    brandImage: "https://assets.risedle.com/logo/v2.svg",
    brandTarget: "_self",

    // UI
    appBg: "#03050D",
    appContentBg: "blue",
    appBorderColor: "#13151F",
    appBorderRadius: 8,

    // Typography
    fontBase: "'Inter', sans-serif",
    fontCode: "'Space Mono', monospace",

    // Text colors
    textColor: "#8E93AF",
    textInverseColor: "red",

    // Toolbar default and active colors
    barTextColor: "#8E93AF",
    barSelectedColor: "#FCFDFF",
    barBg: "#0E1018",

    // Form colors
    inputBg: "red",
    inputBorder: "blue",
    inputTextColor: "pink",
    inputBorderRadius: 8,
});
