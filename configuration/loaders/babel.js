module.exports = (kanopiPackConfig) => {
    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        kanopiPackConfig.resolver.toKanopiPack('node_modules/@babel/preset-env'),
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