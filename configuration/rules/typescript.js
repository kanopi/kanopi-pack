const BabelLoader = require('../loaders/babel');
const JavascriptRules = require('./javascript');

module.exports = (kanopiPackConfig) => {
    let has_source_maps = kanopiPackConfig?.sourceMaps ?? false;
    let auto_typescript_patterns = kanopiPackConfig?.scripts?.additionalTypescriptFileTypes ?? [];
    let use_auto_typescript_patterns = Array.isArray(auto_typescript_patterns) && 0 < auto_typescript_patterns.length;
    let typescriptOptions = {
        transpileOnly: true
    };

    if (use_auto_typescript_patterns) {
        typescriptOptions['appendTsSuffixTo'] = auto_typescript_patterns
    }


    return JavascriptRules(has_source_maps).concat([
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: BabelLoader(has_source_maps)
                .concat([
                    {
                        loader: 'ts-loader',
                        options: typescriptOptions
                    }
                ])
        }
    ]);
}