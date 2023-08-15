/**
 * Main configuration file processor, compiles the full set of options between defaults and the project configuration
 */

const path = require('path');
const { readEnvironmentVariables } = require('./modules/environment');
const { readDevelopmentConfiguration } = require('./modules/developmentServer');
const pathResolver = require('./modules/resolver');
const configurationLoader = require('./modules/configurationFileLoader');
const kanopiPackConfig = configurationLoader.read(pathResolver);

const assetRelativePathToRoot = kanopiPackConfig?.paths?.assetsRelativeToRoot ?? 'assets';
const distributionPath = pathResolver.toCallingPackage(path.join(assetRelativePathToRoot, 'dist'));
const sourcePath = pathResolver.toCallingPackage(path.join(assetRelativePathToRoot, 'src'));

const {
  configuration: developmentConfiguration,
  paths: {
    local: devServerLocalPath,
    public: devServerPublicPath
  }
} = readDevelopmentConfiguration(
  kanopiPackConfig?.devServer ?? {},
  {
    fullPath: distributionPath,
    relativePath: path.join(assetRelativePathToRoot, 'dist')
  }
);

module.exports = {
  devServer: developmentConfiguration,
  environment: readEnvironmentVariables(kanopiPackConfig?.environment ?? {}),
  externals: kanopiPackConfig?.externals ?? { jquery: 'jQuery' },
  filePatterns: {
    cssOutputPattern: kanopiPackConfig?.filePatterns?.cssOutputPath ?? 'css/[name].css',
    entryPoints: kanopiPackConfig?.filePatterns?.entryPoints ?? {},
    jsOutputPattern: {
      filename: kanopiPackConfig?.filePatterns?.jsOutputPath ?? 'js/[name].js',
      path: distributionPath
    }
  },
  minification: {
    enable: kanopiPackConfig?.minification?.enable ?? true,
    options: kanopiPackConfig?.minification?.options ?? {}
  },
  paths: {
    aliases: kanopiPackConfig?.paths?.aliases ?? { '@': sourcePath },
    assets: pathResolver.toCallingPackage(assetRelativePathToRoot),
    assetsRelativeToRoot: assetRelativePathToRoot,
    devServerLocal: devServerLocalPath,
    devServerPublic: devServerPublicPath,
    distribution: distributionPath,
    node: pathResolver.toCallingPackage('node_modules'),
    source: sourcePath
  },
  resolver: pathResolver,
  scripts: {
    additionalResolveExtensions: kanopiPackConfig?.scripts?.additionalResolveExtensions ?? '',
    additionalTypescriptFileTypes: kanopiPackConfig?.scripts?.additionalTypescriptFileTypes ?? [],
    esLintAutoFix: kanopiPackConfig?.scripts?.esLintAutoFix ?? true,
    esLintDisable: kanopiPackConfig?.scripts?.esLintDisable ?? false,
    esLintFileTypes: (kanopiPackConfig?.scripts?.esLintFileTypes ?? 'js,jsx,ts,tsx').split(','),
    useJsxSyntax: kanopiPackConfig?.scripts?.useJsxSyntax ?? false
  },
  sourceMaps: kanopiPackConfig?.sourceMaps ?? false,
  styles: {
    devHeadSelectorInsertBefore: kanopiPackConfig?.styles?.devHeadSelectorInsertBefore ?? undefined,
    scssIncludes: kanopiPackConfig?.styles?.scssIncludes ?? [],
    styleLintAutoFix: kanopiPackConfig?.styles?.styleLintAutoFix ?? true,
    styleLintConfigBaseDir: kanopiPackConfig?.styles?.styleLintConfigBaseDir ?? pathResolver.toKanopiPack(''),
    styleLintConfigFile: kanopiPackConfig?.styles?.styleLintConfigFile ?? pathResolver.toKanopiPack(path.join('configuration', 'tools', 'stylelint.config.js')),
    styleLintIgnorePath: kanopiPackConfig?.styles?.styleLintIgnorePath ?? pathResolver.toKanopiPack(path.join('configuration', 'tools', '.stylelintignore'))
  },
  watchOptions: kanopiPackConfig?.devServer?.watchOptions ?? {}
}
