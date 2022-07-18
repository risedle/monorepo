import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            require("@cypress/code-coverage/task")(on, config);
            return config;
        },
        specPattern: "cypress/e2e/**/*.spec.{ts,tsx}",
        baseUrl: "http://localhost:3000",
    },

    component: {
        specPattern: "cypress/component/*.spec.{ts,tsx}",
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
