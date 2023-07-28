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