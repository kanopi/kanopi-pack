const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = async (config) => {
  try {
    const compiler = webpack(config);
    const server = new WebpackDevServer(config.devServer, compiler);

    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, () => {
        server.stopCallback(() => {
          process.exit(0)
        })
      })
    });

    return new Promise((resolve, reject) => {
      let isFirstCompile = true;

      compiler.hooks.done.tap(
        'kanopi-pack standard development',
        (stats) => {
          if (stats.hasErrors()) {
            return;
          }

          if (isFirstCompile) {
            isFirstCompile = false;

            resolve({
              server,
              url: config.devServer?.devMiddleware?.publicPath ?? ''
            });
          }
        });

      server.startCallback(
        (error) => {
          if (error) {
            reject(error);
          }
        });
    });
  }
  catch (error) {
    console.log('Failure while loading Webpack Dev Server - verify Kanopi Pack Configuration and Node version; otherwise, potential third-party package failure.');
    console.log(error);
  }
}
