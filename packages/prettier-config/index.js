module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    proseWrap: "always",
    printWidth: 79,
    useTabs: false,
    bracketSpacing: true,
    overrides: [
        {
            files: ["*.yml", "*.yaml", "*.json"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
