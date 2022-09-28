# Kanopi Pack - Webpack Orchestration

## Why Kanopi Pack?

The main goals of Kanopi Pack are the following:

* Consolidate management of many common Node module dependencies into a single module
* Provide consistent Static Asset (JS/CSS/Images/etc) bundles across projects, with built-in incremental reloads for development environments
* Support legacy JS/CSS code while incrementally adopting newer style applications, optionally using technologies like ES Modules and TypeScript or frameworks/libraries like React and Vue
* Provide common configuration profiles to support many projects with minimal boilerplate
* Built modularly to through a configuration interface to support future extension and replacement of key features with minimal to no effort for implementing projects


## When Kanopi Pack?

Here are a few questions, if you answer yes to any of them, Kanopi Pack is worth your consideration

* Are you using Grunt, Gulp, some other older technology, or even nothing to manage your static assets?
* Do you want to incrementally add a front-end application, written in React or Vue, alongside your existing site JS code?
* Do you want to start writing or supporting ES Modules, SCSS, or Typescript within your project?
* Do you want to utilize code quality tools like ESLint or StyleLint without managing additional modules and figuring out how to integrate it with your build pipeline?
* Are you using static image/icon assets and want the ability to update them during development without a full bundle build or separate platform integration?


## How Kanopi Pack?

Kanopi Pack is installed via NPM anywhere in your project structure. 

### Installation 

Currently it is a private repository and you can add it to a project using an allowed Github account with SSH:

```
npm i git+ssh:git@github.com:kanopi/kanopi-pack.git
```

Future state, when public: 

```
npm i @kanopi/pack
```

### Configuration

Configuration is implemented via the Main Configuration File, with Preferred location and Section notes detailed [here](./documentation/configuration.md). The only required configuration section is a set of [Entry Points](./documentation/configuration.md#entry-points).


## Documentation Reference

- [Configuration](./documentation/configuration.md)
- [ESLint Support](./documentation/eslint.md)
- [Extending Kanopi Pack](./documentation/extending.md)
