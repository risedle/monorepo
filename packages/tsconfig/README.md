<h2>
    <span>@risedle/tsconfig</span>
    <span><a href="https://www.npmjs.com/package/@risedle/tsconfig"><img src="https://badgen.net/npm/v/@risedle/tsconfig?color=black&labelColor=black"></a></span>
    <span><a href="https://www.npmjs.com/package/@risedle/tsconfig"><img src="https://badgen.net/badge/icon/Made%20By%20Risedle%20Labs?label&color=black&labelColor=black"></a></span>
</h2>

Shared
[Typescript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
configuration.

### Installation

Use the following command to install `@risedle/tsconfig`:

```sh
# npm
npm install --save-dev --save-exact @risedle/tsconfig@latest

# pnpm
pnpm add --save-dev --save-exact @risedle/tsconfig@latest
```

### Usage

Use available json as the baseline for your `tsconfig.json`. For example:

```json
{
    "extends": "@risedle/tsconfig/shared-library.json",
    "compilerOptions": {
        "outDir": "dist"
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

You can use various pre-made config for Node, React etc.

Here is the example on how to use `@risedle/tsconfig` for node project:

```json
{
    "extends": "@risedle/tsconfig/node.json",
    "compilerOptions": {
        "outDir": "dist"
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

### Resources

-   [Using Changesets with pnpm](https://pnpm.io/using-changesets)
