## Risedle Packages

Welcome to the home of all Risedle Packages!

Risedle Package is a resuable javascript/typescript library.

There are two types of package:

1. **Private**: Package is not published to NPM
2. **Public**: Package is published to NPM

Follow the following instructions to create new package:

### Create new package

First, create new directory inside this directory.

For example:

```sh
mkdir chains/
```

Second, init the project:

```sh
npm init
```

Then for private package, set `"private": true` in the `package.json`.

For public package, we use
[semantic-release](https://semantic-release.gitbook.io/semantic-release/) for
automated version management and package publishing.
