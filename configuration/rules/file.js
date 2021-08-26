module.exports = () => {
    return [
        {
            test: /\.(png|jpg|gif|svg|woff|woff2|ttf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        emitFile: false
                    }
                }
            ]
        }
    ]
}