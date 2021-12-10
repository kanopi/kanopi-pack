const { 
  components: {
    loaders: { styles: StyleLoaders },
    plugins: { production: productionPlugins },
    profiles: { production: productionProfile }, 
    rules: { file: FileRules, typescript: TypescriptRules }
  },
  environment: { standard: standardEnvironment }
} = require('../package-builder');

const { resolver: { requirePackageModule } } = standardEnvironment;

const common = require('./common');
const merge = requirePackageModule('webpack-merge');

const { loader: ExtractCSSLoader } = requirePackageModule('mini-css-extract-plugin');

module.exports = merge(
  common(standardEnvironment),
  {
    ...productionProfile(standardEnvironment),
    module: {
      rules: [
        ...FileRules(),
        ...TypescriptRules(standardEnvironment),
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: ExtractCSSLoader
            },
            ...StyleLoaders(standardEnvironment)
          ]
        }
      ]
    },
    plugins: productionPlugins(standardEnvironment)
  }
);