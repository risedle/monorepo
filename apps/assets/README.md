## Risedle Assets

Optimize and serve static asssets.

### Get started

Risedle Assets is live at
[https://assets.risedle.com](https://assets.risedle.com).

If you want to add new asset, simply add the file to [`src/`](./src) directory.

> **Note** Currently it only support SVG file, other files may be supported in
> the future.

Then create pull request. If the pull request is merged to `main`, the
`apps / assets / production` workflow will be triggered and deploy the new
version to Cloudflare Pages.

### Development

Run the following command to deploy manually:

```sh
pnpm pages:deploy
```
