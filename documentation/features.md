# Features

([back to Readme](../Readme.md))

## Asset Minification

By default, CSS and JS files are minified using Terser. The default configuration works for most situations, though if you want to configure the minification options or disable the feature, see the configuration options [here](./configuration.md#section-minification).

## Cache Busting

An opt-in feature, which helps with cache clearing for static assets, is Cache Busting with a mix of Webpack's built-in hashing features and an output JSON file manifest. By itself, Kanopi Pack only outputs the files with a hash in the file name and a list of the entry point names mapped to the current file. For reference, the hash is a nearly-unique identifier generated from the contents of the current file, which in effect means when the file changes the file name will change and there will be a new file to serve and cache. If there are no changes, the file name is the same and no need to cache a new asset.

To implement, the application or site using Kanopi Pack must read the generated JSON file manifest and output the correct file name(s) in the corresponding script/link tags. For WordPress, there is a separate Composer package called Kanopi Pack Asset Loader, to help with implementation.

## Module Optimization and Managing Third Party Libraries

A feature called "tree-shaking" reads all of the packages and, if the third-party package supports it, parts of a package are used in the project, and then builds a "vendor" file which contains only the modules you used. In practice, Kanopi Pack generates a file for each of your Entry Points, plus a required "runtime" file (by default in `assets/dist/js/runtime.js`) which coordinates loading modules for your site/application, and an optional "vendor" file which contains third-party modules (by default in `assets/dist/js/vendor.js`). 