# Upgrading from Kanopi Pack v1 to v2

([back to Readme](../Readme.md))

## Significant Changes and Notes

- Upgrade Webpack from v4 to v5, includes a variety of performance and security enhancements
- Upgrades StyleLint to v14 and PostCSS to v8
- Upgrade TypeScript from v3 to v4
- Chalk is pinned to v4, as v5 is full ESM, which is forward thinking while not applicable to many current JS projects without project work to full ESM

## Upgrade Notes

- When using the `externals` key with a function, change its argument signature from: `function (context, request, callback)` to `function ({ context, request }, callback)`, context and request were changed to be properties of the first argument, details [here](./configuration.md#section-externals)
- For custom StyleLint configurations, you must add the property `'customSyntax': 'postcss-scss'`. StyleLint only implements CSS processing by default as of v8, configuration options [here](./configuration.md#section-styles).
- Ensure [Kanopi Pack Asset Loader](https://github.com/kanopi/kanopi-pack-asset-loader) is updated to the latest version if used in your project, the structure of the asset manifest has changed
