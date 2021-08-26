module.exports = (kanopiPackConfig) => {
    let has_source_maps = kanopiPackConfig?.sourceMaps ?? false;

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
                sourceMaps: has_source_maps
            }
        }
    ];
}