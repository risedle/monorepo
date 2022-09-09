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

### Publish

Risedle packages are automatically published using
[changesets](https://github.com/changesets/changesets).

To publish new version, run the following command in your local machine:

```sh
pnpm changeset
```

Follow the instruction and select only the package that you want to publish,
then commit the `.changeset` directory.

Send pull request using the following template:

```markdown
## Description

<!-- add your description here -->

## Scope

List of affected packages:

-   @risedle/package-name
-   @risedle/package-name

## Linear

<!-- update the issue number, leave this blank if there is none -->

Fix RIS-XXX
```

If the pull request is merged, the `changesets` github action will be triggered
to automatically publish the package.
