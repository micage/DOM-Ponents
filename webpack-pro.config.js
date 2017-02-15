const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const buildPath = path.resolve(__dirname, 'www');

const config = {
    entry: './src/app.js',
    // Render source-map file for final build
    devtool: 'source-map',
    // output config
    output: {
        path: buildPath, // Path of output file
        filename: 'bundle.js', // Name of output file
    },
    plugins: [
        // Minify the bundle
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        // }),
        //
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),

        new webpack.NoEmitOnErrorsPlugin(),

        new TransferWebpackPlugin([
            {from: 'www',to: '/'},
        ]),

        new webpack.DefinePlugin({
            __DEBUG__: process.env.DEBUG,
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(less)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { modules: true }
                    },
                    "less-loader",
                ],
                exclude: "/\.(png|jpg)?$/"
            },
            {
                test: /\.jsx?$/,
                // includes: [path.join(__dirname, '')],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                },
                exclude:  /(node_modules|plugins|platforms|hooks|node_server)/
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.(png|jpg)?$/,
                loader: "file-loader"
            }
        ],
    },
};

module.exports = config;
