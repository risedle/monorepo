<h2>
    <span>@risedle/prettier-config</span>
    <span><a href="https://www.npmjs.com/package/@risedle/prettier-config"><img src="https://badgen.net/npm/v/@risedle/prettier-config?color=black&labelColor=black"></a></span>
    <span><a href="https://risedle.com"><img src="https://badgen.net/badge/icon/Made%20By%20Risedle%20Labs?label&color=black&labelColor=black"></a></span>
</h2>

Shared [Prettier](https://prettier.io) configuration.

### Installation

Use the following command to install `@risedle/prettier-config`:

```sh
# npm
npm install --save-dev --save-exact prettier @risedle/prettier-config@latest

# pnpm
pnpm add --save-dev --save-exact prettier @risedle/prettier-config@latest
```

### Usage

Add the following fields in your `package.json`:

```json
{
    "scripts": {
        "check": "prettier --check ."
    },
    "prettier": "@risedle/prettier-config"
}
```

> **Note** You can ignore files by adding it to `.prettierignore`.

Then you can use `pnpm check` or `npm run check` to check the file formatting.

### Resources

-   [Prettier - Shareable config](https://prettier.io/docs/en/configuration.html)
