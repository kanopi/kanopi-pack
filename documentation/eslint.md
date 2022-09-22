# ESLint Support

([back to Readme](../Readme.md))

## Default Packages

ESLint support is added, enabled by default, to target all JavaScript and TypeScript assets under `./assets/src/`. Linting only takes effect based on ESLint configuration files placed inside a given directory, or the directories ancestor(s). Kanopi Pack includes both `@babel/eslint-parser`, for extended JS support, and `@typescript-eslint/parser` with its companion plugin `@typescript-eslint/eslint-plugin`, for TS support.

To globally lint all assets within `./assets/src/`, add an `.eslintrc.js` file in the directory to configure ESLint. Please note, ESLint continues looking at parent directories for more rules, until it encounters the `"root": true` attribute. This can also be used to override rules in a child directory.

## Example .eslintrc.js File (no TypeScript)

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

## Example .eslintrc.js File (TypeScript)

This can be placed in a TS specific subfolder:

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
