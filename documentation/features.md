# Features

([back to Readme](../Readme.md))

* [Development Server](#development-server)
* [Static Asset (Images, Icons, etc) Management](#static-asset-images-icons-etc-management)
* [Asset Minification](#asset-minification)
* [Cache Busting](#cache-busting)
* [Module Optimization and Managing Third-Party Libraries](#module-optimization-and-managing-third-party-libraries)
* [Linting](#linting)

## Development Server

The development side of the bundler runs as a server, and automatically reloads the changed parts of styles and supporting scripts/applications through a process called hot-module reload (HMR). The configuration offers multiple options to change the IP and Port of the development server, along with the ability to listen for proxied requests when include inside a container based solution.  

### Project Integration

The Development Server solution is different than some other similar middleware based solutions, or full application frameworks which fully control the whole page and therefore included scripts and styles. Any Kanopi Pack based project needs to reference the Development and Production assets at a different set of URLs, typically a different hostname with the same directory structure, for instance `https://0.0.0.0:4400/assets/dist/*` versus `https://my.site/assets/dist/*`. [Kanopi Pack Asset Loader](https://github.com/kanopi/kanopi-pack-asset-loader) is available as a PHP based library to coordinate this and offers a full integration with WordPress. 

## Static Asset (Images, Icons, etc) Management

Any images, icons, etc. which are used via CSS or JS as part of the final package can be included in a subdirectory, i.e. `/src/static/` of the `src` assets folder, and are automatically copied into the distributed packages directory structure under the same file path, i.e. `/dist/static/`.

The location of these files, relative to Development or Production URLs is included dynamically into the root of any project styles. This allows you to reference and change images while in development and manage deployment through the bundle, instead of requiring a full bundle rebuild or separate versions for those assets.

## Asset Minification

By default, CSS and JS files are minified using Terser. The default configuration works for most situations, though if you want to configure the minification options or disable the feature, see the configuration options [here](./configuration.md#section-minification).

## Cache Busting

An opt-in feature, which helps with cache clearing for static assets, is Cache Busting with a mix of Webpack's built-in hashing features and an output JSON file manifest. By itself, Kanopi Pack only outputs the files with a hash in the file name and a list of the entry point names mapped to the current file. For reference, the hash is a nearly-unique identifier generated from the contents of the current file, which in effect means when the file changes the file name will change and there will be a new file to serve and cache. If there are no changes, the file name is the same and no need to cache a new asset.

To implement, the application or site using Kanopi Pack must read the generated JSON file manifest and output the correct file name(s) in the corresponding script/link tags. For WordPress, there is a separate Composer package called Kanopi Pack Asset Loader, to help with implementation.

## Module Optimization and Managing Third Party Libraries

A feature called "tree-shaking" reads all of the packages and, if the third-party package supports it, parts of a package are used in the project, and then builds a "vendor" file which contains only the modules you used. In practice, Kanopi Pack generates a file for each of your Entry Points, plus a required "runtime" file (by default in `assets/dist/js/runtime.js`) which coordinates loading modules for your site/application, and an optional "vendor" file which contains third-party modules (by default in `assets/dist/js/vendor.js`). 

## Linting

ESLint, for scripts, and StyleLint, for styles, are both included and enabled by default in Kanopi Pack. The Kanopi Pack configuration gives you control to replace or disable configuration of either tool to match your project needs.

StyleLint provides a [default configuration](../configuration/tools/stylelint.config.js), which extends the [SMACSS rule set](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss). StyleLint configuration and management are well documented on their own [site](https://stylelint.io/).

ESLint configuration is intended to exist in a project directory and be overridden as needed in subdirectories. There is no default configuration included, it is expected you place a configuration in your repository, more details are [here](eslint.md).

## TypeScript

Kanopi Pack provides **optional** support for TypeScript. TypeScript can be a large step for a project or organization, though can provide better long term maintenance and better code quality when used. Given this duality, it is implemented optionally.  

## React Templates

Kanopi Pack provides support for React JSX style templates, given the project started initially to support bundling for WordPress driven sites, and provides the infrastructure to build one of more Gutenberg blocks within the tool. This feature is opt-in, you can enable support in your [configuration](./configuration.md#section-scripts)
