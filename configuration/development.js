const {
  components: {
    loaders: { styles: StyleLoaders, devStyleLoader },
    plugins: { development: devServerPlugins },
    profiles: { development: devServerProfile },
    rules: { file: FileRules, typescript: TypescriptRules }
  },
  environment: { standard: standardEnvironment }
} = require('../package-builder');

const { resolver: { requirePackageModule } } = standardEnvironment;

const common = require('./common');
const { merge } = requirePackageModule('webpack-merge');

let environment = {
  ...standardEnvironment,
  sourceMaps: true
};

module.exports = merge(
  common(environment),
  {
    ...devServerProfile(environment),
    module: {
      rules: [
        ...FileRules(environment),
        ...TypescriptRules(environment),
        {
          test: /\.(css|scss|sass)$/,
          use: [
            devStyleLoader(environment),
            ...StyleLoaders(environment)
          ]
        }
      ]
    },
    plugins: devServerPlugins(environment)
  }
);
