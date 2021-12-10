/**
 * Set of Webpack Loaders for Stylesheets
 *  - Adds SASS/SCSS and PostCSS support
 *  - Excludes a style-loader, since that tends to vary per application/framework
 * 
 * @param {object} environment - Kanopi Pack environment (Standard Interface)
 * @param {string} prepend_variable_data - SASS/SCSS variable data to override !default values
 * 
 * @returns {Array} - Set of required and configured Webpack Plugins
 */
 module.exports = (environment, prepend_variable_data) => {
    const { 
        resolver: { requirePackageModule },
    } = environment;

    const PostCSSPresetEnv = requirePackageModule('postcss-preset-env');
    const Sass = requirePackageModule('sass');
    
    let isSourceMapsEnabled = environment?.sourceMaps ?? false;
    let prependedPaths = environment?.styles?.scssIncludes ?? [];
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
                        environment?.paths?.node ?? ''
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