module.exports = {
  "customSyntax": "postcss-scss",
  "extends": "stylelint-config-property-sort-order-smacss",
  "rules": {
    "at-rule-disallowed-list": ["debug"],
    "at-rule-no-unknown": null,
    "at-rule-no-vendor-prefix": true,
    "block-no-empty": true,
    "color-hex-length": "long",
    "color-named": ["never", { ignore: "inside-function" }],
    "color-no-invalid-hex": true,
    "declaration-block-single-line-max-declarations": 1,
    "declaration-property-value-disallowed-list": {
      "border": ["none"],
      "border-top": ["none"],
      "border-right": ["none"],
      "border-bottom": ["none"],
      "border-left": ["none"]
    },
    "function-url-quotes": "always",
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
    "selector-max-compound-selectors": 10,
    "selector-max-id": 1,
    "selector-no-qualifying-type": null,
    "selector-no-vendor-prefix": true,
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-element-no-unknown": null,
    "shorthand-property-no-redundant-values": true,
    "value-no-vendor-prefix": true
  }
};
