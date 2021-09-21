/**
 * Main configuration file for Kanopi's Webpack Implementation
 */

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const { exit } = require('process');
const calling_project_root = process.cwd();
const kanopi_pack_root = path.resolve(__dirname, '..');

const pathResolver = {
    toCallingPackage: (pathFragment) => {
        return path.resolve(calling_project_root, pathFragment);
    },
    toKanopiPack: (pathFragment) => {
        return path.resolve(kanopi_pack_root, pathFragment);
    }
};

const hostBuilder = (host, port) => 80 !== port ? `${host}:${port}` : `${host}`;

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
let relative_distribution_path = path.join(assets_relative_to_root, 'dist');
let source_path = pathResolver.toCallingPackage(path.join(assets_relative_to_root, 'src'));

let dev_server_allowed_hosts = (kanopiPackConfig?.devServer?.allowedHosts ?? []).concat([
    '.localhost',
    'localhost',
    '.docksal',
    '.test',
    '127.0.0.1'
]);
let dev_server_host = kanopiPackConfig?.devServer?.host ?? '0.0.0.0';
let dev_server_port = parseInt(kanopiPackConfig?.devServer?.port ?? 4400);
let dev_server_sock_host = kanopiPackConfig?.devServer?.sockHost ?? '';;
let dev_server_sock_port = parseInt(kanopiPackConfig?.devServer?.sockPort ?? 80);
let dev_server_use_proxy = kanopiPackConfig?.devServer?.useProxy ?? false;
let dev_server_local_url = hostBuilder(dev_server_host, dev_server_port);
let dev_server_url = dev_server_use_proxy ? hostBuilder(dev_server_sock_host, dev_server_sock_port) : dev_server_local_url;
let dev_server_local_path = `http://${dev_server_local_url}/${relative_distribution_path}/`;
let dev_server_public_path = `http://${dev_server_url}/${relative_distribution_path}/`;

let dev_server_configuration = {
    allowedHosts: dev_server_allowed_hosts,
    contentBase: distribution_path,
    host: dev_server_host,
    port: dev_server_port,
    publicPath: dev_server_public_path,
    watchOptions: {
        aggregateTimeout: parseInt(kanopiPackConfig?.devServer?.watchOptions?.aggregateTimeout ?? 600),
        poll: kanopiPackConfig?.devServer?.watchOptions?.poll ?? false
    }
};

let typescript_filetype_patterns = kanopiPackConfig?.scripts?.additionalTypescriptFileTypes ?? [];

if (dev_server_use_proxy) {
    dev_server_configuration = {
        ...dev_server_configuration,
        sockHost: dev_server_sock_host,
        sockPort: dev_server_sock_port
    }
}

typescript_filetype_patterns.concat([/\.vue$/])

module.exports = {
    devServer: dev_server_configuration,
    filePatterns: {
        cssOutputPattern: kanopiPackConfig?.filePatterns?.cssOutputPath ?? 'css/[name].css',
        entryPoints: kanopiPackConfig?.filePatterns?.entryPoints ?? {},
        jsOutputPattern: {
            filename: kanopiPackConfig?.filePatterns?.jsOutputPath ?? 'js/[name].js',
            path: distribution_path
        }
    },
    paths: {
        assets: assets,
        assetsRelativeToRoot: assets_relative_to_root,
        devServerLocal: dev_server_local_path,
        devServerPublic: dev_server_public_path,
        distribution: distribution_path,
        node: pathResolver.toCallingPackage('node_modules'),
        source: source_path
    },
    resolver: pathResolver,
    scripts: {
        additionalTypescriptFileTypes: typescript_filetype_patterns,
    },
    sourceMaps: kanopiPackConfig?.sourceMaps ?? false,
    styles: {
        scssIncludes: kanopiPackConfig?.styles?.scssIncludes ?? [],
        stylelintAutoFix: kanopiPackConfig?.styles?.scssAutoFix ?? true,
        stylelintConfigPath: path.join(assets, 'configuration', 'tools', '.stylelintrc'),
    }
}