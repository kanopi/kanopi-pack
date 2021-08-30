const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = async (task, additonalArgs) => {
    try {
        const config = require('./configuration/webpack.development');
        const compiler = webpack(config);
        const server = new WebpackDevServer(compiler, config.devServer);

        ['SIGINT', 'SIGTERM'].forEach(signal => {
            process.on(signal, () => {
                server.close(() => {
                    process.exit(0)
                })
            })
        });

        return new Promise((resolve, reject) => {
            let isFirstCompile = true;

            compiler.hooks.done.tap(
                'kanopi-pack development',
                (stats) => {
                    if (stats.hasErrors()) {
                        return;
                    }

                    if (isFirstCompile) {
                        isFirstCompile = false;

                        resolve({
                            server,
                            url: config.paths.dev_url
                        });
                    }
                });

            server.listen(
                config.devServer.port,
                config.devServer.host,
                (error) => {
                    if (error) {
                        reject(error);
                    }
                });
        });
    }
    catch (error) {
        console.log(error);
    }
}