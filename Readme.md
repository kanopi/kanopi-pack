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

## Section: `externals` 
Optional settings to map externally loaded script libraries, useful if a CMS or Framework load these scripts external to these bundles.

### Strucutre

    "externals": {
        "jquery": "jQuery"
    }


### Details

List of key/value pair which match the Package name (i.e. `'jquery'`) to the its Global/Window location (i.e. `'jQuery'` for `window.jQuery`).


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
        "aliases": {
            "@": './path/to/source_files/'
        },
        "assetsRelativeToRoot": "assets"
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|-----------|------|-------|
| `aliases` | { '@': './assets/src/'} | No | Object | List of string/sybmol aliases to source folders; helps manage import/path references |
| `assetsRelativeToRoot` | assets | No | String | Containing folder for all assets, relative to the package/project root |


## Section: `scripts` 
JavaScript and TypeScript related configuration.

### Strucutre

    "scripts": {
        "additionalResolveExtensions": '',
        "additionalTypescriptFileTypes": [],
        "esLintAutoFix": true,
        "esLintDisabld": false,
        "esLintFileTypes": 'js,jsx,ts'
    }


### Details

| Setting | Default | Required? | Type | Usage |
|---------|---------|:---------:|------|-------|
| `additionalResolveExtensions` |  | No | String | Additional extensions which can be automatically use in JS import statements, added to .js, .ts, and .json |
| `additionalTypescriptFileTypes` |  | No | String | Additional file types containing TypeScript, other than .ts |
| `esLintAutoFix` | true | No | Boolean | Enable to auto-fix source files on lint |
| `esLintDisable` | false | No | Boolean | Enable to disable ESLint through Webpack |
| `esLintFileTypes` | js,jsx,ts | No | String | Comma-delimited list of linted file extensions (no dot); overrides default |

## Section: `sourceMaps` 
Production/distribution setting only, determines if these builds contain source maps. By default, this is disabled, and should be for most circumstances.

### Strucutre

    "sourceMaps": false


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

# ESLint Support

ESLint support is added, enabled by default, to target all JavaScript and TypeScript assets under `./assets/src/`. Linting only takes effect based on ESLint configuration files placed inside a given directory, or the directories ancestor(s). Kanopi Pack includes both `@babel/eslint-parser`, for extended JS support, and `@typescript-eslint/parser` with its companion plugin `@typescript-eslint/eslint-plugin`, for TS support.

To globally lint all assets within `./assets/src/`, add an `.eslintrc.js` file in the directory to configure ESLint. Please note, ESLint continues looking at parent directories for more rules, until it encounters the `"root": true` attribute. This can also be used to override rules in a child directory.

The following example covers all JS files (no TS support):

```./assets/src/.eslintrc.js
module.exports = {
    "root": true,
    "extends": [
        "eslint:recommended",
    ],
    "env": {
        "browser": true,
        "node": true
    },
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "requireConfigFile": false,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", "tab"]
    }
}
```

Here is one with TypeScript support, which you might place in a TS specific subfolder:

```./assets/src/ts/.eslintrc.js
module.exports = {
    "root": true,
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": ["error", "tab"]
    }
}
```

# Extending Kanopi Pack

## Intent of Package
Almost everything within the current `@kanopi/pack` package is exposed externally to allow reuse of the Standard configuration, while allowing full, quick composition of a new/extended configuration. The intent is for this package to be included as a Peer Package dependency to avoid module duplication in the file system.

### Package Strucutre
When`@kanopi/pack` is referenced in another package (i.e. `require('@kanopi/pack')`), it returns a structure with fragments of the standard configuration for extended composition, pre-built configurations, a wrapper for the kanopi-pack command, and development and production build runners. Globbing is used to build the package tree based of folder/file name, so the structure will mimic the directory structure of the `src/` directory, with pre-built/standard configurations under `configuration`.


    {
        "commands": {
            "standard": 'Wrapper for the Commander CLI runner, see repository and bin script for example usage'
        }
        "configuration": {
            "common": 'Common profile and plugins for all build profiles',
            "development": 'Development server profile and plugins',
            "production": 'Production build profile and plugins',
        },
        "components": {
            "loaders": {
                ... Set of standard loaders for Babel and Styles
            },
            "plugins": {
                ... Set of plugins for each standard environment profile
            },
            "profiles": {
                ... Set/profile of common Webpack settings for each standard environment
            },
            "rules": {
                ... Set of standard Webpack rules for Files and Scripts
            }
        },
        "environment": {
            "standard": 'Environment settings based on the projects configuration file, injected into most Kanopi Pack configurations and components'
        },
        "runners": {
            "runDevServer": 'Runs Webpack Dev Server based on the provided configuration',
            "runWebpack": 'Runs Webpack production build based on the provided configuration'
        }
    }

