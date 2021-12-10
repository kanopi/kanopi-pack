/**
 * Webpack configuration profile settings, for Development servers
 * 
 * @param {*} configuration - Kanopi Pack Configuration (Standard Interface)
 * @returns {object} Webpack configuration partial pattern
 */
module.exports = (configuration) => {
    const { 
        devServer: devServerSettings,
        paths: { devServerPublic } 
    } = configuration;

    return {
        output: {
            publicPath: devServerPublic
          },
          mode: 'development',
          devtool: 'inline-source-map',
          devServer: {
            ...devServerSettings,
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
            hotOnly: true,
            inline: true,
            overlay: { warnings: false, errors: true }
          }
    };
}