module.exports = (kanopiPackConfig) => {
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
                sourceMaps: kanopiPackConfig.sourceMaps
            }
        }
    ];
}