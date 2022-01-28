const BabelLoader = require('../loaders/babel');

module.exports = (environment) => {
    const {
        scripts: { useJsxSyntax }
    } = environment;
    return [
        {
            test: useJsxSyntax ? /\.jsx?$/ : /\.js$/,
            exclude: /node_modules/,
            use: BabelLoader(environment)
        }
    ]
}