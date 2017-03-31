var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader','angular2-template-loader'],
            },

            {
                test: /\.(css|html)$/,
                loader: 'raw-loader'
            }
        ]
    },

    devServer: {
        proxy: {'/api/*': 'http://localhost:8080/Gradle2'}
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
             name: ['vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        }),

    ],
};
