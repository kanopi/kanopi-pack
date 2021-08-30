const BabelLoader = require('../loaders/babel');

module.exports = (kanopiPackConfig) => {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: BabelLoader(kanopiPackConfig)
        }
    ]
}