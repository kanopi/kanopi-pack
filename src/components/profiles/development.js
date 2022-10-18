/**
 * Webpack configuration profile settings, for Development servers
 * 
 * @param {*} configuration - Kanopi Pack Configuration (Standard Interface)
 * @returns {object} Webpack configuration partial pattern
 */
module.exports = (configuration) => {
  const {
    devServer: devServerSettings,
    paths: { devServerPublic },
    watchOptions: {
      aggregateTimeout = 600,
      interval = 1000,
      poll = false
    }
  } = configuration;

  const watchOptions = true === poll
    ? {
      aggregateTimeout: aggregateTimeout,
      poll: interval
    }
    : {}

  return {
    output: {
      publicPath: devServerPublic
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      ...devServerSettings,
      client: {
        ...devServerSettings.client,
        overlay: { warnings: false, errors: true }
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      historyApiFallback: {
        disableDotRule: true,
        htmlAcceptHeaders: [
          'text/html',
          'application/xhtml+xml'
        ]
      },
      hot: 'only',
      liveReload: false,
      setupExitSignals: true
    },
    watchOptions: watchOptions
  };
}