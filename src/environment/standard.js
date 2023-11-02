/**
 * @typedef {Object} PackConfiguration
 * @property {AssetFileTypes} assets - Asset loader file type configuration
 * @property {DevelopmentServerConfiguration} devServer - Development server configuration
 * @property {DotEnvConfiguration} environment - Support for DotEnv configuration files
 * @property {Object} filePatterns - Set of file patterns for input/output files
 * @property {Object} minification - Minification controls
 * @property {Object} paths - Set of determined paths to project files
 * @property {PathResolver} resolver - Resolve paths to this and other Node modules
 * @property {boolean} sourceMaps - Control whether to enable source maps 
 * @property {Object} scripts - JS/TS/Script Linting Configuration
 * @property {Object} styles - CSS/SASS/Style Linting Configuration
 * @property {Object} watchOptions - DevServer polling configuration
 */

/**
 * Main configuration file processor, compiles the full set of options between defaults and the project configuration
 */

const path = require('path');
const { readAssetFileTypes } = require('./modules/assets');
const { readEnvironmentVariables } = require('./modules/environment');
const { readDevelopmentConfiguration } = require('./modules/developmentServer');
const pathResolver = require('./modules/resolver');
const configurationLoader = require('./modules/configurationFileLoader');
const kanopiPackConfig = configurationLoader.read(pathResolver);

const assetRelativePathToRoot = kanopiPackConfig?.paths?.assetsRelativeToRoot ?? 'assets';
const distributionPath = pathResolver.toCallingPackage(path.join(assetRelativePathToRoot, 'dist'));
const sourcePath = pathResolver.toCallingPackage(path.join(assetRelativePathToRoot, 'src'));
const sourceRelativePathToRoot = path.join(assetRelativePathToRoot, 'src') + '/';
const staticAssetOutputName = kanopiPackConfig?.filePatterns?.staticAssetOutputName ?? '[name].[hash][ext][query]';

const useSass = kanopiPackConfig?.styles?.useSass ?? true;
const defaultStyleLintConfiguration = pathResolver.toKanopiPack(path.join('..', 'configuration', 'tools', 'stylelint.config.js'));
const defaultStyleLintIgnore = pathResolver.toKanopiPack(path.join('..', 'configuration', 'tools', '.stylelintignore'));

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

/**
 * @returns {PackConfiguration}
 */
module.exports = {
  assets: readAssetFileTypes(kanopiPackConfig?.assets),
  devServer: developmentConfiguration,
  environment: readEnvironmentVariables(kanopiPackConfig?.environment ?? {}),
  externals: kanopiPackConfig?.externals ?? { jquery: 'jQuery' },
  filePatterns: {
    cssOutputPattern: kanopiPackConfig?.filePatterns?.cssOutputPath ?? 'css/[name].css',
    entryPoints: kanopiPackConfig?.filePatterns?.entryPoints ?? {},
    jsOutputPattern: {
      filename: kanopiPackConfig?.filePatterns?.jsOutputPath ?? 'js/[name].js',
      path: distributionPath,
      assetModuleFilename: (pathData) => {
        const fileRelativePath = path.dirname(pathData.filename);
        const fileDistributionPath = fileRelativePath.startsWith(sourceRelativePathToRoot)
          ? fileRelativePath.replace(sourceRelativePathToRoot, '')
          : fileRelativePath.split('/').slice(2).join('/');

        return path.join(fileDistributionPath, staticAssetOutputName);
      }
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
    postCssCustomizePluginOrder: kanopiPackConfig?.styles?.postCssCustomizePluginOrder ?? undefined,
    postCssCustomParser: kanopiPackConfig?.styles?.postCssCustomParser ?? undefined,
    scssIncludes: kanopiPackConfig?.styles?.scssIncludes ?? [],
    styleLintAutoFix: kanopiPackConfig?.styles?.styleLintAutoFix ?? true,
    styleLintConfigBaseDir: kanopiPackConfig?.styles?.styleLintConfigBaseDir ?? pathResolver.toKanopiPack(''),
    styleLintConfigFile: kanopiPackConfig?.styles?.styleLintConfigFile ?? defaultStyleLintConfiguration,
    styleLintIgnorePath: kanopiPackConfig?.styles?.styleLintIgnorePath ?? defaultStyleLintIgnore,
    useSass: useSass
  },
  watchOptions: kanopiPackConfig?.devServer?.watchOptions ?? {}
}
