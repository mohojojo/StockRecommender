/* global process, __dirname, require, module */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const dirJs = path.resolve(__dirname, 'js');
const dirHtml = path.resolve(__dirname, 'html');
const dirBuild = path.resolve(__dirname, 'build');

const isProduction = process.env.NODE_ENV === 'production';
console.info('Current environment is', process.env.NODE_ENV || 'development');

module.exports = {
    entry: {
        app : [path.resolve(dirJs, 'index.js')]
    },

    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    output: {
        path: dirBuild,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: dirJs,
                exclude: /node_modules/
            },
            {
                test: /\.(less)$/,
                loader: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: (loader) => [
                            require('postcss-cssnext')()
                        ]
                    }
                }, {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.(svg|woff|woff2|ttf|otf|eot)$/,
                loader: 'url-loader'
            },
            // {
            //     test: /\.json$/,
            //     loader: 'json-loader'
            // },
            {
                test: /\.(png|jpg)$/,
                // include: dirImg,
                loader: 'url-loader?limit=10000'
                // inline base64 URLs for <=10k images, direct URLs for the rest
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: dirHtml
            }
            // {
            //    // from: dirImg,
            //     to: 'img'
            // }
        ]),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: isProduction ? 'cheap-module-source-map' : 'source-map'
};
