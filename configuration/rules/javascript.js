const BabelLoader = require('../loaders/babel');

module.exports = (kanopiPackConfig) => {
    let has_source_maps = kanopiPackConfig?.sourceMaps ?? false;

    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: BabelLoader(has_source_maps)
        }
    ]
}