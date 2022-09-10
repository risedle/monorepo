<h2>
    <span>@risedle/eslint-config</span>
    <span><a href="https://www.npmjs.com/package/@risedle/eslint-config"><img src="https://badgen.net/npm/v/@risedle/eslint-config?color=black&labelColor=black"></a></span>
    <span><a href="https://risedle.com"><img src="https://badgen.net/badge/icon/Made%20By%20Risedle%20Labs?label&color=black&labelColor=black"></a></span>
</h2>

Shared [ESLint](https://eslint.org/) configuration.

### Installation

Use the following command to install `@risedle/eslint-config`:

```sh
# npm
npm install --save-dev --save-exact eslint typescript @risedle/eslint-config@latest

# pnpm
pnpm add --save-dev --save-exact eslint typescript @risedle/eslint-config@latest
```

### Usage

Add the following fields in your `.eslintrc.js`:

```js
module.exports = {
    extends: ["@risedle/eslint-config"],
    ignorePatterns: ["dist/*", ".eslintrc.js"],
};
```

Adjust the `ignorePatterns` based on your project requirements.

Then add the following script in your `package.json`:

```json
{
    "scripts": {
        "lint": "eslint ."
    }
}
```

You can use `pnpm lint` or `npm run lint` to run the linter.

### Resources

-   [ESLint - Shareable config](https://eslint.org/docs/latest/developer-guide/shareable-configs)
