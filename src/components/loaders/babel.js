module.exports = (environment) => {
    const {
        scripts: { useJsxSyntax },
        sourceMaps
    } = environment;

    let presets = [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true
                }
            }
        ]
    ];

    if (useJsxSyntax) {
        presets = presets.concat(['@babel/preset-react']);
    }

    return [
        {
            loader: 'babel-loader',
            options: {
                presets: presets,
                sourceMaps: sourceMaps
            }
        }
    ];
}