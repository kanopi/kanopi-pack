const BabelLoader = require('../loaders/babel');
const JavascriptRules = require('./javascript');

module.exports = (environment) => {
    let has_source_maps = environment?.sourceMaps ?? false;
    let auto_typescript_patterns = environment?.scripts?.additionalTypescriptFileTypes ?? [];
    let use_auto_typescript_patterns = Array.isArray(auto_typescript_patterns) && 0 < auto_typescript_patterns.length;
    let typescriptOptions = {
        transpileOnly: true
    };

    if (use_auto_typescript_patterns) {
        typescriptOptions['appendTsSuffixTo'] = auto_typescript_patterns
    }

    return JavascriptRules(environment).concat([
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: BabelLoader(environment)
                .concat([
                    {
                        loader: 'ts-loader',
                        options: typescriptOptions
                    }
                ])
        }
    ]);
}