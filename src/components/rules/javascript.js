const BabelLoader = require('../loaders/babel');

module.exports = (environment) => {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: BabelLoader(environment)
        }
    ]
}