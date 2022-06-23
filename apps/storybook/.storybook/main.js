module.exports = {
    stories: ["../stories/**/*.stories.mdx"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-postcss",
            options: {
                cssLoaderOptions: {
                    // When you have splitted your css over multiple files
                    // and use @import('./other-styles.css')
                    importLoaders: 1,
                },
                postcssLoaderOptions: {
                    // When using postCSS 8
                    implementation: require("postcss"),
                },
            },
        },
    ],
    core: {
        builder: "webpack5",
    },
    framework: "@storybook/react",
};
