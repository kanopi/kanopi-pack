module.exports = {
  "extends": "stylelint-config-property-sort-order-smacss",
  "rules": {
    "at-rule-disallowed-list": ["debug"],
    "at-rule-no-unknown": null,
    "at-rule-no-vendor-prefix": true,
    "block-no-empty": true,
    "block-opening-brace-space-before": "always",
    "color-hex-case": "lower",
    "color-hex-length": "long",
    "color-named": ["never", { ignore: "inside-function" }], 
    "color-no-invalid-hex": true,
    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-block-semicolon-newline-after": "always",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-single-line-max-declarations": 1,
    "declaration-block-trailing-semicolon": "always",
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    "declaration-property-value-disallowed-list": {
      "border": ["none"],
      "border-top": ["none"],
      "border-right": ["none"],
      "border-bottom": ["none"],
      "border-left": ["none"]
    },
    "function-comma-space-after": "always-single-line",
    "function-parentheses-space-inside": "never",
    "function-url-quotes": "always",
    "indentation": "tab",
    "length-zero-no-unit": true,
    "max-nesting-depth": [
      10,
      {
        "ignoreAtRules": [
          "each",
          "media",
          "supports",
          "include"
        ]
      }
    ],
    "media-feature-name-no-vendor-prefix": true,
    "media-feature-parentheses-space-inside": "never",
    "no-missing-end-of-source-newline": true,
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    "property-no-unknown": true,
    "property-no-vendor-prefix": null,
    "rule-empty-line-before": [
      "always-multi-line",
      {
        "except": ["first-nested"],
        "ignore": ["after-comment"]
      }
    ],
    "selector-class-pattern": [
      "^[a-z0-9\\-\\_]+$",
      {
        "message":
          "Selector should be written in lowercase with hyphens and/or underscores (selector-class-pattern)"
      }
    ],
    "selector-list-comma-newline-after": "always",
    "selector-max-compound-selectors": 10,
    "selector-max-id": 1,
    "selector-no-qualifying-type": null,
    "selector-no-vendor-prefix": true,
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-element-no-unknown": null,
    "shorthand-property-no-redundant-values": true,
    "string-quotes": "single",
    "value-no-vendor-prefix": true
  }
};
