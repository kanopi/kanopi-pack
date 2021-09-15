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

let dev_server_allowed_hosts = (package_variables?.kanopiPackConfig?.devServer?.allowedHosts ?? []).concat([
    '.localhost',
    'localhost',
    '.docksal',
    '.test',
    '127.0.0.1'
]);
let dev_server_host = package_variables?.kanopiPackConfig?.devServer?.host ?? '0.0.0.0';
let dev_server_port = parseInt(package_variables?.kanopiPackConfig?.devServer?.port ?? 4400);
let dev_server_sock_host = package_variables?.kanopiPackConfig?.devServer?.sockHost ?? '';;
let dev_server_sock_port = parseInt(package_variables?.kanopiPackConfig?.devServer?.sockPort ?? 80);
let dev_server_use_proxy = package_variables?.kanopiPackConfig?.devServer?.useProxy ?? false;
let dev_server_public_path, dev_server_url;
let dev_server_configuration = {
    allowedHosts: dev_server_allowed_hosts,
    contentBase: distribution_path,
    host: dev_server_host,
    port: dev_server_port,
    watchOptions: {
        aggregateTimeout: parseInt(package_variables?.kanopiPackConfig?.devServer?.watchOptions?.aggregateTimeout ?? 600),
        poll: package_variables?.kanopiPackConfig?.devServer?.poll ?? false
    }
};

let typescript_filetype_patterns = package_variables?.kanopiPackConfig?.scripts?.additionalTypescriptFileTypes ?? [];

if (dev_server_use_proxy) {
    dev_server_url =  80 !== dev_server_sock_port ? `${dev_server_sock_host}:${dev_server_sock_port}` : `${dev_server_sock_host}`;
    dev_server_public_path = `http://${dev_server_url}/${relative_distribution_path}`;
    dev_server_configuration = {
        ...dev_server_configuration,
        publicPath: dev_server_public_path,
        sockHost: dev_server_sock_host,
        sockPort: dev_server_sock_port
    }
}
else {
    dev_server_url = 80 !== dev_server_port ? `${dev_server_host}:${dev_server_port}` : `${dev_server_host}`;
    dev_server_public_path = `http://${dev_server_url}/${relative_distribution_path}`;
    dev_server_configuration = {
        ...dev_server_configuration,
        publicPath: dev_server_url,
    };
}

typescript_filetype_patterns.concat([/\.vue$/])

module.exports = {
    devServer: dev_server_configuration,
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
        dev_url: dev_server_url,
        distribution: distribution_path,
        node: pathResolver.toCallingPackage('node_modules'),
        source: source_path
    },
    output: {
        publicPath: dev_server_public_path
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