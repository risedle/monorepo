module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/ban-types": "off",
    },
};
