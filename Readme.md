# Kanopi Pack - Webpack Orchestration

## Documentation Reference

- [Configuration](./documentation/configuration.md)
- [ESLint Support](./documentation/eslint.md)
- [Extending Kanopi Pack](./documentation/extending.md)
- [Features](./documentation/features.md)
- [How To's](./documentation/howtos.md)
- [Upgrading from Kanopi Pack v1 to v2](./documentation/upgrade.md)

## Example Configurations

- [Base without TypeScript](./examples/base-no-typescript/)

## Why Kanopi Pack?

The main goals of Kanopi Pack are the following:

* Consolidate management of many common Node module dependencies into a single module. This package is a wrapper for Webpack and coordinates its configuration and implemented modules.
* Provide common configuration profiles to support many projects with minimal boilerplate
* Builds a modular configuration interface to support future extension and replacement of key features, with less effort for implementing projects
* Provide consistent Static Asset (JS/CSS/Images/etc) bundles across projects, with built-in incremental reloads for development environments
* Support legacy JS/CSS code while incrementally adopting newer style applications, optionally using technologies like ES Modules and TypeScript or frameworks/libraries like React and Vue

## When Kanopi Pack?

* Are you using Grunt, Gulp, some other older technology, or even nothing to manage your static assets?
* Do you want to incrementally add a front-end application, written in React or Vue, alongside your existing site JS code?
* Do you want to start writing or supporting ES Modules, Modern CSS with PostCSS, SCSS, or Typescript within your project?
* Do you want to utilize code quality tools like ESLint or StyleLint without managing additional modules and figuring out how to integrate it with your build pipeline?
* Are you using static image/icon assets and want the ability to update them during development without a full bundle build or separate platform integration?

Since this is a wrapper for Webpack, if you are already using Webpack or similar process, you likely do not need to consider this. However, if you are using another similar package which requires you to maintain all of its dependencies, it may be worth a look.

## How Kanopi Pack?

Kanopi Pack is installed via NPM anywhere in your project structure. 

### Installation 

```
npm i @kanopi/pack
```

If you are trying to test a given feature request, use the following command to install the test package:

```
npm i https://github.com/kanopi/kanopi-pack.git#<feature/branch-path>
```

Where `<feature/branch-path>` is replaced with the branch name, no `<>`.

### Configuration

Configuration is implemented via the Main Configuration File, with Preferred location and Section notes detailed [here](./documentation/configuration.md). The only required configuration section is a set of [Entry Points](./documentation/configuration.md#entry-points).

## Node & Package Compatibility

### Dependency Limitations

| Package                  | Version | Notes                                                                                                                  | 
|:-------------------------|:--------|:-----------------------------------------------------------------------------------------------------------------------|
| Chalk                    | 4.x     | Chalk v5.x uses ESM which is not compatible with the rest of the Node modules used here, it is locked at v4.x for now. |
| Commander                | 11.x    | There are some API changes which require further evaluation outside of a standard update.                              |
| StyleLint                | 15.x    | Other Stylelint packages are restricted to 15.x maximum currently, will reevaluate in future cycles.                   | 
| StyleLint Webpack Plugin | 4.x     | StyleLint 16.x and Node 18.x support, keeping back due to StyleLint version limitations                                |
| Webpack Dev Server       | 4.x     | Dev Server API changes with version 5.x, requires evaluation outside of a standard maintenance cycle.                  |


### Platform Software Requirements

| Package | Minimum | Recommended | 
|:--------|:--------|:------------|
| Node    | 18.x    | 20.x        |
| NPM     | 9.x     | 10.x         |

### Dependent Packages

- Kanopi Pack React and Kanopi Pack Vue versions both track with Kanopi Pack, use v1.x and v2.x accordingly
