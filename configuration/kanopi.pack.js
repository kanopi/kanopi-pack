/**
 * Main configuration file for Kanopi's Webpack Implementation
 */
const path = require('path');
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

let package_variables = require(pathResolver.toCallingPackage('package.json'));
let assets_relative_to_root = package_variables?.kanopiPackConfig?.paths?.assetsRelativeToRoot ?? 'assets';
let assets = pathResolver.toCallingPackage(assets_relative_to_root);
let distribution_path = pathResolver.toCallingPackage(path.join(assets_relative_to_root, 'dist'));
let relative_distribution_path = path.join(assets_relative_to_root, 'dist');
let source_path = pathResolver.toCallingPackage(path.join(assets_relative_to_root, 'src'));

let dev_server_allowed_hosts = package_variables?.kanopiPackConfig?.devServer?.allowedHosts ?? [];
let dev_server_port = package_variables?.kanopiPackConfig?.devServer?.port ?? 4400;
let typescript_filetype_patterns = package_variables?.kanopiPackConfig?.scripts?.additionalTypescriptFileTypes ?? [];
let dev_url = `localhost:${dev_server_port}`;

dev_server_allowed_hosts = dev_server_allowed_hosts.concat([
    '.localhost',
    'localhost',
    '.docksal',
    '127.0.0.1'
]);
typescript_filetype_patterns.concat([/\.vue$/])

module.exports = {
    devServer: {
        allowedHosts: dev_server_allowed_hosts,
        host: `http://${dev_url}/${relative_distribution_path}/`,
        port: dev_server_port
    },
    filePatterns: {
        cssOutputPattern: package_variables?.kanopiPackConfig?.filePatterns?.jsOutputPath ?? 'css/[name].css',
        entryPoints: package_variables?.kanopiPackConfig?.filePatterns?.entryPoints ?? {},
        jsOutputPattern: {
            filename: package_variables?.kanopiPackConfig?.filePatterns?.jsOutputPath ?? 'js/[name].js',
            path: distribution_path
        }
    },
    paths: {
        assets: assets,
        assetsRelativeToRoot: assets_relative_to_root,
        dev_url: dev_url,
        distribution: distribution_path,
        node: pathResolver.toCallingPackage('node_modules'),
        source: source_path
    },
    resolver: pathResolver,
    scripts: {
        additionalTypescriptFileTypes: typescript_filetype_patterns,
    },
    sourceMaps: package_variables?.kanopiPackConfig?.sourceMaps ?? false,
    styles: {
        scssIncludes: package_variables?.kanopiPackConfig?.styles?.scssIncludes ?? [],
        stylelintAutoFix: package_variables?.kanopiPackConfig?.styles?.scssAutoFix ?? true,
        stylelintConfigPath: path.join(assets, 'configuration', 'tools', '.stylelintrc'),
    }
}