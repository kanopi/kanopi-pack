module.exports = (environment) => {
    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                esmodules: true
                            }
                        }
                    ]
                ],
                sourceMaps: environment.sourceMaps
            }
        }
    ];
}