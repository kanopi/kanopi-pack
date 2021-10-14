Kanopi Pack - Webpack Orchestration
======

# Configuration File

A full list of available configuration options along with default values or direction are included in `sample.kanopi-pack.json`. @kanopi/pack searches your project directory for a JSON file named `kanopi-pack.json` or a CommonJS file called `kanopi-pack.js`, in either the root or `assets/configuration` folder.

# Configuration Sections

The following sections allow customization with listed `defaults` and `optional\required` status.

## Section: `devServer`
Configure Webpack Dev Server, by default runs on `0.0.0.0:4400`, with asset listing at `http://0.0.0.0:4400/webpack-dev-server`.

### Strucutre

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
| `sockPort` | 80 | No | Numeric | Proxy Host Port, only active if `useProxy` is enabled |
| `useProxy` | false | No | Boolean | Set true to enable the proxy |
| `watchOptions` |  | No | Object | - |
| `watchOptions.aggregateTimeout` | 600 | No | Numeric | Wait time (debounce) after a file change to process bundle changes |
| `watchOptions.poll` | false | No | Boolean | Set true to enable file system pooling, required for use in containers |


## Section: `filePatterns` 
A map of input (`entryPoints`) file locations and output file path patterns.

### Strucutre

    "filePatterns": {
        "cssOutputPath": "css/[name].css",
        "entryPoints": {
            "scripts": "relative/path/to/file.js",
            "styles": "relative/path/to/file.scss"
        },
        "jsOutputPath": "js/[name].js"
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `cssOutputPath` | css/[name].css | No | String | Output path for CSS files, accepts tokens like `[name]` and `[hash]` |
| `entryPoints` | {} | Yes | ObjectMap[Name:FilePath] |  Map of `[name]` tokens to the entry file path; the project fails/exits if this is empty |
| `jsOutputPath` | js/[name].js | No | String | Output path for CSS files, accepts tokens like `[name]` and `[hash]` |

## Section: `minification` 
Configure minification of assets using Terser.

### Strucutre

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
| `options` | {} | No | Object |  Terser plugin options, use the `terserOptions` key for Terser options |


## Section: `paths` 
Settings for the asset structure, by default, all source assets are in the `assets/src` folder and all distribution assets are in the `assets/dist` folder, relative to the package/project root.

### Strucutre

    "paths": {
        "assetsRelativeToRoot": "assets"
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|-----------|------|-------|
| `assetsRelativeToRoot` | assets | No | String | Containing folder for all assets, relative to the package/project root |


## Section: `scripts` 
JavaScript and TypeScript related configuration.

### Strucutre

    "scripts": {
        "additionalTypescriptFileTypes": []
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `additionalTypescriptFileTypes` | .vue | No | String | Additional file types containing TypeScript, other than .ts |

## Section: `sourceMaps` 
Production/distribution setting only, determines if these builds contain source maps. By default, this is disabled, and should be for most circumstances.

### Strucutre

    "scripts": false


## Section: `styles` 
Style configuration options, especially related to StyleLint. By default, it uses the `stylelint-config-property-sort-order-smacss` order (Order package is installed) and a number of sensible rules common at Kanopi. Due to the default, configuration options are set relative to this modules path, and if you plan to install and extend a different ruleset, configure `styleLintConfigBaseDir` to the package/project root directory. Additionally, to ignore file globs, you must set a `.stylelintignore` in the package/project root directory.

### Strucutre

    "styles": {
        "scssIncludes": [],
        "styleLintAutoFix": true,
        "styleLintConfigBaseDir": null,
        "styleLintConfigFile": null
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `scssIncludes` | [] | No | String[] | Set of SCSS files injected into each SCSS capable entry point |
| `styleLintAutoFix` | true | No | Boolean | When enabled, automatically fix source files according to StyleLint rules |
| `styleLintConfigBaseDir` | node_modules/@kanopi/pack | No | String | Relative path for StyleLint configuration options |
| `styleLintConfigFile` | node_modules/@kanopi/pack/configuration/tools/stylelint.config.js | No | String | Relative path for StyleLint configuration file |
| `styleLintIgnorePath` | node_modules/@kanopi/pack/configuration/tools/.stylelintignore | No | String | Relative path for a StyleLint ignore file |
