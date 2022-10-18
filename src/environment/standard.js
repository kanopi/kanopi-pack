/**
 * Main configuration file for Kanopi's Webpack Implementation
 */

/**
 * @typedef {Object} DistributionPaths
 * @property {string} fullPath - Full path to the distribution files
 * @property {string} relativePath - Relative path to the distribution files
 */

const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const calling_project_root = process.cwd();
const kanopi_pack_root = path.resolve(__dirname, '..', '..');
const { readEnvironmentVariables } = require('./modules/environment');
const { readDevelopmentConfiguration } = require('./modules/developmentServer');

const pathResolver = {
    toCallingPackage: (pathFragment) => {
        return path.resolve(calling_project_root, pathFragment);
    },
    toKanopiPack: (pathFragment) => {
        return path.resolve(kanopi_pack_root, pathFragment);
    },
    requirePackageModule: (packageName) => {
        return require(pathResolver.toCallingPackage('node_modules/' + packageName));
    }
};

const chalk = pathResolver.requirePackageModule('chalk');

const configuration_locations = [
    pathResolver.toCallingPackage('kanopi-pack.js'),
    pathResolver.toCallingPackage('assets/configuration/kanopi-pack.js'),
    pathResolver.toCallingPackage('kanopi-pack.json'),
    pathResolver.toCallingPackage('assets/configuration/kanopi-pack.json')
];

let kanopiPackConfig;

for (let path_index in configuration_locations) {
    let config_path = configuration_locations[path_index];
    if (fs.existsSync(config_path)) {
        kanopiPackConfig = require(config_path);
        break;
    }
}

if (!kanopiPackConfig) {
    console.log(chalk.red("ERROR: ") + "kanopi-pack.json configuration file not found, checked the following locations:");
    configuration_locations.forEach((location) => {
        console.log(chalk.yellow(location));
    })
    exit();
}

let assets_relative_to_root = kanopiPackConfig?.paths?.assetsRelativeToRoot ?? 'assets';
let assets = pathResolver.toCallingPackage(assets_relative_to_root);
let distribution_path = pathResolver.toCallingPackage(path.join(assets_relative_to_root, 'dist'));
let source_path = pathResolver.toCallingPackage(path.join(assets_relative_to_root, 'src'));
let path_aliases = kanopiPackConfig?.paths?.aliases ?? { '@': source_path };

let externalScripts = kanopiPackConfig?.externals ?? { jquery: 'jQuery' };
let additionalResolveExtensions = kanopiPackConfig?.scripts?.additionalResolveExtensions ?? '';
let typescript_filetype_patterns = kanopiPackConfig?.scripts?.additionalTypescriptFileTypes ?? [];

const {
    configuration: development_configuration,
    paths: {
        local: devServerLocalPath,
        public: devServerPublicPath
    }
} = readDevelopmentConfiguration(
    kanopiPackConfig?.devServer ?? {},
    {
        fullPath: distribution_path,
        relativePath: path.join(assets_relative_to_root, 'dist')
    }
);

module.exports = {
    devServer: development_configuration,
    environment: readEnvironmentVariables(kanopiPackConfig?.environment ?? {}),
    externals: externalScripts,
    filePatterns: {
        cssOutputPattern: kanopiPackConfig?.filePatterns?.cssOutputPath ?? 'css/[name].css',
        entryPoints: kanopiPackConfig?.filePatterns?.entryPoints ?? {},
        jsOutputPattern: {
            filename: kanopiPackConfig?.filePatterns?.jsOutputPath ?? 'js/[name].js',
            path: distribution_path
        }
    },
    minification: {
        enable: kanopiPackConfig?.minification?.enable ?? true,
        options: kanopiPackConfig?.minification?.options ?? {}
    },
    paths: {
        aliases: path_aliases,
        assets: assets,
        assetsRelativeToRoot: assets_relative_to_root,
        devServerLocal: devServerLocalPath,
        devServerPublic: devServerPublicPath,
        distribution: distribution_path,
        node: pathResolver.toCallingPackage('node_modules'),
        source: source_path
    },
    resolver: pathResolver,
    scripts: {
        additionalResolveExtensions: additionalResolveExtensions,
        additionalTypescriptFileTypes: typescript_filetype_patterns,
        esLintAutoFix: kanopiPackConfig?.scripts?.esLintAutoFix ?? true,
        esLintDisable: kanopiPackConfig?.scripts?.esLintDisable ?? false,
        esLintFileTypes: (kanopiPackConfig?.scripts?.esLintFileTypes ?? 'js,jsx,ts,tsx').split(','),
        useJsxSyntax: kanopiPackConfig?.scripts?.useJsxSyntax ?? false
    },
    sourceMaps: kanopiPackConfig?.sourceMaps ?? false,
    styles: {
        scssIncludes: kanopiPackConfig?.styles?.scssIncludes ?? [],
        styleLintAutoFix: kanopiPackConfig?.styles?.styleLintAutoFix ?? true,
        styleLintConfigBaseDir: kanopiPackConfig?.styles?.styleLintConfigBaseDir ?? pathResolver.toKanopiPack(''),
        styleLintConfigFile: kanopiPackConfig?.styles?.styleLintConfigFile ?? pathResolver.toKanopiPack(path.join('configuration', 'tools', 'stylelint.config.js')),
        styleLintIgnorePath: kanopiPackConfig?.styles?.styleLintIgnorePath ?? pathResolver.toKanopiPack(path.join('configuration', 'tools', '.stylelintignore'))
    },
    watchOptions: kanopiPackConfig?.devServer?.watchOptions ?? {}
}