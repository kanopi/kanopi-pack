# Extending Kanopi Pack

([back to Readme](../Readme.md))

## Intent of Package
Almost everything within the current `@kanopi/pack` package is exposed externally to allow reuse of the Standard configuration, while allowing full, quick composition of a new/extended configuration. The intent is for this package to be included as a Peer Package dependency to avoid module duplication in the file system.

### Package Structure
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
