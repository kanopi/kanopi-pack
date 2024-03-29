# Configuration

([back to Readme](../Readme.md))

## Configuration File Location

A full list of available configuration options along with default values or direction are included in [`sample.kanopi-pack.json`](../examples/sample.kanopi-pack.json). @kanopi/pack searches your project directory for a JSON file named `kanopi-pack.json` or a CommonJS file called `kanopi-pack.js`, in either the root or `assets/configuration` folder. See a basic example of this in the [Base No TypeScript](../examples/base-no-typescript/) example.

## Configuration File Sections

The following sections allow customization with listed `defaults` and `optional\required` status.

* [`assets`](#section-assets)
* [`devServer`](#section-devserver)
* [`environment`](#section-environment)
* [`externals`](#section-externals)
* [`filePatterns`](#section-filepatterns)
* [`minification`](#section-minification)
* [`paths`](#section-paths)
* [`scripts`](#section-scripts)
* [`sourcemaps`](#section-sourcemaps)
* [`styles`](#section-styles)



## Section: `assets` 
Optional settings configure how different asset file types are handled. When an option is set for `inlineFileTypes`, they are removed for the list of Resources automatically.

### Structure 

    "assets": {
        "inlineFileTypes": [],
        "resourceFileTypes": ['png', 'svg', 'jpg', 'jpeg', 'gif', 'woff', 'woff2', 'eot', 'ttf', 'otf'],
    }

### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `inlineFileTypes` | [] | No | string|string[] | Set of file extensions, filtered out of `resourceFileType` automatically |
| `resourceFileTypes` | 'png', 'svg', 'jpg', 'jpeg', 'gif', 'woff', 'woff2', 'eot', 'ttf', 'otf'] | No | string|string[] | Set to change the defaults |


## Section: `devServer`
Configure Webpack Dev Server, by default runs on `0.0.0.0:4400`, with asset listing at `http://0.0.0.0:4400/webpack-dev-server`.

### Structure

    "devServer": {
        "allowedHosts": [],
        "host": "0.0.0.0",
        "port": 4400,
        "sockHost": "",
        "sockPort": 80,
        "useProxy": false,
        "watchOptions": {
            "aggregateTimeout": 600,
            "poll": false
        }
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `allowedHosts` | '.localhost', 'localhost', '.docksal', '.test', '127.0.0.1' | No | String[] | Add additional host names/IP(s) to the default list to access the server |
| `host` | 0.0.0.0 | No | String | Host Name/IP(s) of the server |
| `port` | 4400 | No | Numeric | Port of the server |
| `sockHost` |  | No | String | Proxy Host Name/IP(s), sets publicPath of server assets |
| `sockPort` | 80 | No | Numeric | Proxy Host Port, set to 443 for SSL, only active if `useProxy` is enabled |
| `useSslProxy` | false | No | Boolean | Set true to enable SSL for the proxy, only active if `useProxy` is enabled |
| `useProxy` | false | No | Boolean | Set true to enable the proxy |
| `watchOptions` |  | No | Object | - |
| `watchOptions.aggregateTimeout` | 600 | No | Numeric | Wait time (debounce) after a file change to process bundle changes |
| `watchOptions.poll` | false | No | Boolean | Set true to enable file system pooling, required for use in containers |


## Section: `environment` 
Optional settings configure environment variables through Dotenv.

### Structure 

    "environment": {
        "dotenvEnable": true,
        "dotenvConfiguration": {
            ... Dotenv options
        }
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `dotenvConfiguration` | {} | No | Object | Configuration for Dotenv, options [here](https://github.com/mrsteele/dotenv-webpack#properties) |
| `dotenvEnable` | true | No | Boolean | Set true to enable Dotenv |


## Section: `externals` 
Optional settings to map externally loaded script libraries, useful if a CMS or Framework load these scripts external to these bundles.

### Structure 

    "externals": {
        "jquery": "jQuery"
    }


### Details

List of key/value pair which match the Package name (i.e. `'jquery'`) to the its Global/Window location (i.e. `'jQuery'` for `window.jQuery`). When using the function variant, the function is of the form `function ({context, request}, callback) { ... }`, see full details [here](https://webpack.js.org/configuration/externals/#function).

### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `externals` | {"jquery": "jQuery"} | No | Object | Function | Direct list or function which returns a set of key/value pairs of import name to global/window variable name. |



## <a name="file-patterns">Section</a>: `filePatterns` 
A map of input (`entryPoints`) file locations and output file path patterns.

### Structure 

    "filePatterns": {
        "cssOutputPath": "css/[name].css",
        "entryPoints": {
            "scripts": "relative/path/to/file.js",
            "styles": "relative/path/to/file.scss"
        },
        "jsOutputPath": "js/[name].js",
        "staticAssetOutputName": "[name].[hash][ext][query]"
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `cssOutputPath` | css/[name].css | No | String | Output path for CSS files, accepts tokens like `[name]` and `[hash]` |
| `entryPoints` | {} | Yes | ObjectMap[Name:FilePath] |  Map of `[name]` tokens to the entry file path; the project fails/exits if this is empty |
| `jsOutputPath` | js/[name].js | No | String | Output path for CSS files, accepts tokens like `[name]` and `[hash]` |
| `staticAssetOutputName` | [name].[hash][ext][query] | No | String | Output name for static files (like Fonts and Images), accepts tokens like `[name]`, `[ext]` (contains the preceding .) and `[hash]`. Static files retain their relative path to the `src` directory so paths are consistent in the `dist` folder. |

## Section: `minification` 
Configure minification of assets using Terser.

### Structure 

    "minification": {
        "enable": true,
        "options": {
            "terserOptions": {
                "mangle": true,
               ... other Terser options ...
            }
        },
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `enable` | true | No | Boolean | Enable/disable minification of assets |
| `options` | {} | No | Object |  Use the `terserOptions` sub-key for Terser options, outlined [here](https://github.com/terser/terser#minify-options) |


## Section: `paths` 
Settings for the asset structure, by default, all source assets are in the `assets/src` folder and all distribution assets are in the `assets/dist` folder, relative to the package/project root.

### Structure 

    "paths": {
        "aliases": {
            "@": "./path/to/source_files/"
        },
        "assetsRelativeToRoot": "assets"
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|-----------|------|-------|
| `aliases` | { '@': './assets/src/'} | No | Object | List of string/symbol aliases to source folders; helps manage import/path references |
| `assetsRelativeToRoot` | assets | No | String | Containing folder for all assets, relative to the package/project root |


## Section: `scripts` 
JavaScript and TypeScript related configuration.

### Structure 

    "scripts": {
        "additionalResolveExtensions": "",
        "additionalTypescriptFileTypes": [],
        "esLintAutoFix": true,
        "esLintDisable": false,
        "esLintFileTypes": "js,jsx,ts,tsx",
        "useJsxSyntax": false
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `additionalResolveExtensions` |  | No | String | Additional extensions which can be automatically use in JS import statements, added to .js, .ts, and .json. If Jsx is enabled, .jsx and .tsx are also enabled. |
| `additionalTypescriptFileTypes` |  | No | String | Additional file types containing TypeScript, other than .ts |
| `esLintAutoFix` | true | No | Boolean | Enable to auto-fix source files on lint |
| `esLintDisable` | false | No | Boolean | Enable to disable ESLint through Webpack |
| `esLintFileTypes` | js,jsx,ts,tsx | No | String | Comma-delimited list of linted file extensions (no dot); overrides default |
| `useJsxSyntax` | false | No | Boolean | Enable to process JSX/TSX files through Babel |

## Section: `sourceMaps` 
Production/distribution setting only, determines if these builds contain source maps. By default, this is disabled, and should be for most circumstances.

### Structure 

    "sourceMaps": false


## Section: `styles` 
Style configuration options, especially related to StyleLint. By default, it uses the `stylelint-config-property-sort-order-smacss` order (Order package is installed) and a number of sensible rules common at Kanopi. Due to the default, configuration options are set relative to this modules path, and if you plan to install and extend a different rule set, configure `styleLintConfigBaseDir` to the package/project root directory. When extending, know that StyleLint uses CSS syntax only, by default, so you must add `"customSyntax": "postcss-scss"` to your custom configuration. Additionally, to ignore file globs, you must set a `.stylelintignore` in the package/project root directory.

### Structure 

    "styles": {
        "devHeadSelectorInsertBefore": undefined,
        "postCssCustomizePluginOrder": undefined,
        "scssIncludes": [],
        "styleLintAutoFix": true,
        "styleLintConfigBaseDir": null,
        "styleLintConfigFile": null,
        "styleLintIgnorePath": null,
        "useSass": true
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `devHeadSelectorInsertBefore` | undefined | No | String | Specify a valid CSS selector in the document `head`, Dev Styles are inserted before it if present, or the bottom of the `head` tag when undefined or invalid  |
| `postCssCustomizePluginOrder` | undefined | No | String|Object[] | Set of PostCSS plugin names or object with the Plugin Name and Options |
| `postCssCustomParser` | undefined | No | String | Set a custom parser for PostCSS, for instance, use postcss-scss to parse SCSS syntax |
| `scssIncludes` | [] | No | String[] | Set of SCSS files injected into each SCSS capable entry point |
| `styleLintAutoFix` | true | No | Boolean | When enabled, automatically fix source files according to StyleLint rules |
| `styleLintConfigBaseDir` | node_modules/@kanopi/pack | No | String | Relative path for StyleLint configuration options |
| `styleLintConfigFile` | node_modules/@kanopi/pack/configuration/tools/stylelint.config.js | No | String | Relative path for StyleLint configuration file |
| `styleLintIgnorePath` | node_modules/@kanopi/pack/configuration/tools/.stylelintignore | No | String | Relative path for a StyleLint ignore file |
| `useSass` | true | No | Boolean | When enabled, SASS styles are compiled |

### Available PostCSS Plugins

The following plugins are added by default, in the following order: 

- [postcss-import-ext-glob](https://github.com/dimitrinicolas/postcss-import-ext-glob)
- [postcss-import](https://github.com/postcss/postcss-import)
- [postcss-mixins](https://github.com/postcss/postcss-mixins)
- [postcss-custom-selectors](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-selectors)
- [postcss-nested](https://github.com/postcss/postcss-nested)
- [postcss-custom-media](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media)
- [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env)

#### Overriding PostCSS plugins

In order to use a different set of PostCSS plugins OR add options to existing plugins, you can set the `styles.postCssCustomizePluginOrder` property. The following example keeps all of the available plugins in order, adding options to `postcss-import` and keeps the autoprefixer for grid enabled.

```
    "styles": {
        "postCssCustomizePluginOrder": [
          'postcss-import-ext-glob',
          [
            'postcss-import',
            {
              ... options
            }
          ],
          'postcss-mixins',
          'postcss-custom-selectors',
          'postcss-nested',
          'postcss-custom-media',
          [
            'postcss-preset-env',
            {
              autoprefixer: { 'grid': 'autoplace' }
            }
          ]
        ]
    }
```
