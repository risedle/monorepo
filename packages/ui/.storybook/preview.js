export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: "white",
        values: [
            {
                name: "risedle",
                value: "#03050D",
            },
            {
                name: "white",
                value: "#FFFFFF",
            },
        ],
    },
};
