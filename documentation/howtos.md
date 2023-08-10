# How To Guides

([back to Readme](../Readme.md))

## Table of contents

- [Add a New NPM Module to a Project Module](#add-a-new-npm-module-to-a-project-module)
- [Add a New Script or Style File](#add-a-new-script-or-style-file)
- [Configure Cache Busting within Kanopi Pack](#configure-cache-busting-within-kanopi-pack)
- [Implement Kanopi Pack for an Existing Project](#implement-kanopi-pack-for-an-existing-project)
- [My CMS custom CSS does not work with Kanopi Pack](#my-cms-custom-css-does-not-work-with-kanopi-pack)
- [Make Existing JavaScript Modular](#make-existing-javascript-modular)
- [Use CMS or System Provided JavaScript Libraries](#use-cms-or-system-provided-javascript-libraries)
- [Use Images, Icons, etc. with Kanopi Pack](#use-images-icons-etc-with-kanopi-pack)

## Add a New NPM Module to a Project Module

Consider we want to use a slider library, in this case, it's available on NPM as `@kanopi/slider` which contains a **Named Export** of `KanopiSlider`.

You start by adding the library as a direct dependency (no -d), so it is included in the vendor bundler.

```bash
npm i @kanopi/slider
```

Then inside our project JavaScript module, at path `assets/src/js/modules/slider.js`, we import the slider library and export our implemented module:

```javascript
import { KanopiSlider } from '@kanopi/slider';

/**
 * Turns a set of HTML elements into a set of sliders
 * 
 * @param string[] element_collection
 * 
 * @returns KanopiSlider[]
 */
const ProjectSlider = (element_collection) => {
    let options = {
        ... some options for the project
    };

    return element_collection.forEach( (element) => {
        // Maybe other logic 

        return KanopiSlider(element, options);
    }
}

export { ProjectSlider };
```

Then in the entry point, at `assets/src/js/index.js`, we include and call our modules:

```javascript
import { ProjectSlider } from 'modules/slider`;

ProjectSlider('.element_selector');
```


## Add a New Script or Style File

Let us say you want to add a separate Script and/or Style file for a specific set of pages, like you have a Songs section of your site which uses separate functionality and styling than the rest of your site.

Whenever you add a new Script or Style, you are adding a new **Entry Point** to the Kanopi Pack configuration. If you are adding both a script and style, you will add two (2) new entry points, one for each.

### Before adding Script and Style

For the Book example, assume you start with the following [File Patterns](configuration.md#section-filepatterns) section of `kanopi-pack.js`:

```
module.exports = {
    //... other configuration ...
    "filePatterns": {
        "cssOutputPath": "css/[name].css",
        "entryPoints": {
            "theme": "./assets/src/scss/theme/index.scss",
            "theme-app": "./assets/src/js/theme/index.js"
        },
        "jsOutputPath": "js/[name].js"
    },
    //... other configuration ...
}
```

For reference, the output files will include:

```
├── assets
│ ├── dist
│ ├── ├── css
│ ├── ├── ├── theme.css
│ ├── ├── js
│ ├── ├── ├── theme-app.js
```

### After adding Script and Style

We then add the two (2) entry points, with distinct names, to the **"entryPoints"** key of **"filePatterns"**:

```
module.exports = {
    //... other configuration ...
    "filePatterns": {
        "cssOutputPath": "css/[name].css",
        "entryPoints": {
            "song": "./assets/src/scss/song/index.scss",
            "song-app": "./assets/src/js/song/index.js",
            "theme": "./assets/src/scss/theme/index.scss",
            "theme-app": "./assets/src/js/theme/index.js"
        },
        "jsOutputPath": "js/[name].js"
    },
    //... other configuration ...
}
```

Now, the output directory will include the files:

```
├── assets
│ ├── dist
│ ├── ├── css
│ ├── ├── ├── song.css
│ ├── ├── ├── theme.css
│ ├── ├── js
│ ├── ├── ├── song-app.js
│ ├── ├── ├── theme-app.js
```

The new files must still be registered in the CMS or HTML templates you are using, which is outside of the scope of this tool. If you are using WordPress, the [Kanopi Pack Asset Loader](https://github.com/kanopi/kanopi-pack-asset-loader/) is available to help with registration.



## Configure Cache Busting within Kanopi Pack

In order to enable cache busting within Kanopi Pack, you need to tell the Kanopi Pack configuration to output file names with hashes.

Modify the kanopi-pack.js file like the following:

```javascript
modules.export = {
    // ... rest of file
    "filePatterns": {
        "cssOutputPath": "css/[name].[hash].css",
        "entryPoints": {
            "legacy": "./assets/src/js/legacy.js",
            "theme": "./assets/src/scss/index.scss"
        },
        "jsOutputPath": "js/[name].[hash].js"
    }
}
```

You will then find a file in the output directory, by default `assets/dist/webpack-assets.json`, containing mappings like this:

```json
{
  "legacy": {
    "js": "js/legacy.1080064923bd38698545.js"
  },
  "theme": {
    "css": "css/theme.1080064923bd38698545.css",
    "js": "js/theme.1080064923bd38698545.js"
  },
  "runtime": {
    "js": "js/runtime.1080064923bd38698545.js"
  },
  "vendor": {
    "js": "js/vendor.1080064923bd38698545.js"
  }
}
```


## Implement Kanopi Pack for an Existing Project

An example configuration is found in this repository under `examples/base-no-typescript`.

1. Install the package to the theme, plugin, etc. directory with npm

### CSS/SCSS

1. Move any CSS/SCSS assets in the `assets/src/scss` folder.
1. If you have existing SCSS entry point from Gulp, Grunt, etc use that as your entry point.
1. If you only have CSS files, you can copy/paste them directly into a SCSS file with minimal change.

In the example, there is a single entry point, `index.scss` which includes/uses SCSS from another file. SCSS is moving to a modular style of composition, which probably doesn't match your legacy codebase. You can mimic this global @import (deprecated) style of inclusion with `@use 'path/to/scss_file' as *;`. 

### JS

1. Add an appropriate ESLint configuration file. There are examples included, and if unsure, a basic implementation is described [here](./eslint.md#no-typescript).
1. Add your JavaScript modules to the JavaScript entry point with import statements. See the section [Make Existing JavaScript Modular](#make-existing-javascript-modular) for examples if your existing code is not modular.


## Make Existing JavaScript Modular

JavaScript loaded and processed by the asset bundler is expected to be in ES modules or automatically run closures.

For example, your project uses legacy JavaScript, like a jQuery based slider, placed inside a template or directly included script file. 

The function may look something like the following snippet, which uses both jQuery and lodash:

```javascript
$(document).load(function() {
    _.each($('.elements'), function (item) {
        item.sliderInitialization();
    });
});
```

Transform this into a loadable module, which uses window/global attached versions of jQuery and lodash:

```javascript
(function(viewport, $, _) {
    $(viewport).load(function() {
        _.each($('.elements'), function (item) {
            item.sliderInitialization();
        });
    });
})(document, window.jQuery, window.lodash);
```

The important part in this segment is the format of a function which is immediate called with supplied arguments: `(function(...argument_list){})(...supplied_arguments)`.

There are other, better approaches to refactoring this code, this in NOT a best practice. Use this approach to quickly make existing code function within the bundler. 


## My CMS custom CSS does not work with Kanopi Pack

In some cases, you use a CMS or other system which generates its own dynamic CSS and injects it into the `head` of the document. Production sites are generally fine since you usually control the placement of the stylesheet, and can put it before the dynamic CSS style block. Webpack Dev Server, on the other hand, loads CSS through JavaScript. These scripts place each progressive style tag at the bottom of the `head` by default.

### Control Placement of the Dev Server Styles

The Kanopi Pack configuration offers an option to insert the Dev Server created styles into the `head` at a given position. Consider there is a `style` block in the document `head` with an ID of `cms-custom-id`, i.e. `<style id="cms-custom-id">...</style>`. You can force Webpack Dev Server to add style blocks before the CMS custom style block, with the following configuration setting:

```javascript
modules.export = {
    // ... rest of file
    "styles": {
        "devHeadSelectorInsertBefore": "#custom-css-id",
        ... any other style settings
    }
}
```


## Use CMS or System Provided JavaScript Libraries

CMS's like Drupal or WordPress, chances are there are existing JS libraries loaded by the system, like jQuery or Lodash. If your existing code uses these libraries, or you need to write code which uses them, you need the asset bundler to know they exist. 

This is accomplished by adding a configuration section called `externals` to the Kanopi Pack configuration which maps the external library to an internal name for use inside the compiled assets. The section can be either a direct mapping, or a function which passes the package name, useful for processing a large set of libraries.

### Mapped List Example

```javascript
modules.export = {
    // ... rest of file
    "externals": {
        "jquery": "jQuery",
        "lodash": "lodash",
        "lodash-es": "lodash"
    }
}
```

### Function Example


```javascript
modules.export = {
    // ... rest of file
    "externals": [
        function (_context, request, callback) {
            let externalRequest = defaultRequestToExternal(request);

            return externalRequest ? callback(null, externalRequest) : callback();
        }
    ]
}

/**
 * Default request to global transformation
 * 
 *  - `undefined` ignores the request
 *  - `string|string[]` maps the request to an external library
 * 
 * @param {string} request Module request (the module name in `import from`) to be transformed
 * @return {string|string[]|undefined} The resulting external definition
 */
function defaultRequestToExternal(request) {
    let mapping = [
        'lodash' => 'lodash',
        'lodash-es' => 'lodash',
        'jquery' => 'jQuery',
        'react' => 'React',
        'react-dom' => 'ReactDOM',
        'react-refresh/runtime' => 'ReactRefreshRuntime'
    ];

    if ( -1 < mapping.indexOf(request)) {
        return mapping[request];
    }

    if (request.startsWith('@wordpress')) {
        return [
            'wp',
            function (request) {
                // Other text testing/processing, like camel-case to dashes, etc
            } 
        ];
    }
}

```




## Use Images, Icons, etc. with Kanopi Pack

The bundler provides a dynamic SCSS variable named `$asset_root`, injected into every entry point which supports SCSS, and matches the root of the current environment, Development or Production.

As an example, since `@use` statements are recommended via Dart SASS, you either need to pass this variable down to child SCSS files, or use CSS variables (recommended). 

Take, for example, including icons in a stylesheet, directly from entry point file, `assets/src/scss/index.scss`:

```scss
$asset_root: '../' !default;
$static_image_path: $asset_root + 'static/images/';

:root {
	--my-icon-menu-svg: url('#{static_image_path}menu.svg');
}

@use 'components/menu';
```

In other files, for instance the menu component, you can use standard CSS variable references:

```scss
.menu {
    .trigger {
        &:before {
            // ... other styles
            background: var(--my-icon-menu-svg);
        }
    }
}
```

An alternative approach, particularly if managing multiple images and colors, is to segment these `:root` styles into a separate SCSS file. Refactoring the example above, with an additional `@use` statement:


```scss
$asset_root: '../' !default;

@use 'root_variables' with ($root_path: $asset_path);
@use 'components/menu' as *;
```

Please note the assignment `$root_path: $asset_root` is passing the asset path into the other SCSS module, where we chose the name `$root_path` as a variable with default value in the module. The `asset/src/scss/root_variables.scss` file is then of the form:

```scss
$root_path: '../' !default;
$static_image_path: $root_path + 'static/images/';

:root {
	--my-icon-menu-svg: url('#{static_image_path}menu.svg');
}
```

