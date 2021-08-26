const PostCSSPresetEnv = require('postcss-preset-env');
const Sass = require('sass');

module.exports = (kanopiPackConfig, prepend_variable_data) => {
    let isSourceMapsEnabled = kanopiPackConfig?.sourceMaps ?? false;
    let prependedPaths = kanopiPackConfig?.styles?.scssIncludes ?? [];
    let prependVariableData = prepend_variable_data ?? '';
    let usePrependedPaths = Array.isArray(prependedPaths) && 0 < prependedPaths.length;

    let baseRules = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: isSourceMapsEnabled,
                url: false
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        PostCSSPresetEnv,
                        {
                            autoprefixer: { 'grid': 'autoplace' }
                        }
                    ]
                },
                sourceMap: isSourceMapsEnabled
            }
        },
        {
            loader: 'sass-loader',
            options: {
                additionalData: prependVariableData,
                implementation: Sass,
                sassOptions: {
                    includePaths: [
                        kanopiPackConfig?.paths?.node ?? ''
                    ],
                    linefeed: 'lf',
                    outputStyle: 'expanded',
                },
                sourceMap: isSourceMapsEnabled,
            }
        }
    ];

    if (usePrependedPaths) {
        baseRules.push({
            loader: 'style-resources-loader',
            options: {
                patterns: prependedPaths
            }
        });
    }

    return baseRules;
}