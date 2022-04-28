const {
  components: {
    loaders: { styles: StyleLoaders },
    plugins: { development: devServerPlugins },
    profiles: { development: devServerProfile },
    rules: { file: FileRules, typescript: TypescriptRules }
  },
  environment: { standard: standardEnvironment }
} = require('../package-builder');

const { resolver: { requirePackageModule } } = standardEnvironment;

const common = require('./common');
const merge = requirePackageModule('webpack-merge');

let environment = {
  ...standardEnvironment,
  sourceMaps: true
};

module.exports = merge.smart(
  common(environment),
  {
    ...devServerProfile(environment),
    module: {
      rules: [
        ...FileRules(),
        ...TypescriptRules(environment),
        {
          test: /\.(css|scss|sass)$/,
          use: [
            'style-loader',
            ...StyleLoaders(environment, `$asset_root: '${environment.paths.devServerPublic}';`)
          ]
        }
      ]
    },
    plugins: devServerPlugins(environment)
  }
);