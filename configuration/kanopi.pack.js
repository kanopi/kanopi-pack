/**
 * Main configuration file for Kanopi's Webpack Implementation
 */
const path = require('path');

let project_directory = process.cwd();
let package_variables = require(path.resolve(project_directory, 'package.json'));
let assets_relative_to_root = package_variables?.kanopiPackConfig?.paths?.assetsRelativeToRoot ?? 'assets';
let assets = path.resolve(project_directory, assets_relative_to_root);
let distribution_path = path.resolve(assets, 'dist');
let relative_distribution_path = path.join(assets_relative_to_root, 'dist');

let dev_server_allowed_hosts = package_variables?.kanopiPackConfig?.devServer?.allowedHosts ?? [];
let dev_server_port = package_variables?.kanopiPackConfig?.devServer?.port ?? 4400;
let typescript_filetype_patterns = package_variables?.kanopiPackConfig?.scripts?.additionalTypescriptFileTypes ?? [];

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
        host: `http://localhost:${dev_server_port}/${relative_distribution_path}/`,
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
        distribution: distribution_path,
        node: path.resolve(project_directory, 'node_modules'),
        source: path.resolve(assets, 'src')
    },
    scripts: {
        additionalTypescriptFileTypes: typescript_filetype_patterns,
    },
    sourceMaps: package_variables?.kanopiPackConfig?.sourceMaps ?? false,
    styles: {
        scssIncludes: package_variables?.kanopiPackConfig?.styles?.scssIncludes ?? [],
        stylelintAutoFix: package_variables?.kanopiPackConfig?.styles?.scssAutoFix ?? true,
        stylelintConfigPath: path.resolve(assets, 'configuration', 'tools', '.stylelintrc'),
    }
}