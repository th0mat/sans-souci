var debug = true;  // change to false for webpack to build bundle.min.js
var webpack = require('webpack');

var config = {
    context: __dirname + "/app",
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./client.js",

    output: {
        filename: "bundle.js",
        path: __dirname + "/app",
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            }
        ],
    },

    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ],
};
module.exports = config;