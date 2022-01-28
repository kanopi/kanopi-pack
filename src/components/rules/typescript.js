const BabelLoader = require('../loaders/babel');
const JavascriptRules = require('./javascript');

module.exports = (environment) => {
    const {
        scripts: { additionalTypescriptFileTypes, useJsxSyntax }
    } = environment;

    let typescriptOptions = {
        transpileOnly: true
    };
    if (Array.isArray(additionalTypescriptFileTypes) && 0 < additionalTypescriptFileTypes.length) {
        typescriptOptions['appendTsSuffixTo'] = additionalTypescriptFileTypes
    }

    return JavascriptRules(environment).concat([
        {
            test: useJsxSyntax ? /\.tsx?$/ : /\.ts$/,
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