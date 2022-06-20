## @risedle/types

Type definitions used across Risedle apps and packages.

### Installation

```sh
npm install --save --save-exact @risedle/types@latest
```

### Usage

In order to use for Typescript apps, you need to set `node16` as
`moduleResolution` in the compiler options.

```json
    "compilerOptions": {
        ...
        "moduleResolution": "node16",
    },
```

Here is the example on how to use `@risedle/types`:

```typescript
// Like this
import { ChainId, Chain } from "@risedle/types";

// Or like this
import { ChainId, Chain } from "@risedle/types/chain";
```
