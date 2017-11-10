var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: [
        'pixi',
        'p2',
        'phaser',
        './src/main.ts'
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            phaser,
            pixi,
            p2
        }
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader' },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] }

        ]
    },
    devServer: {
        contentBase: 'public',
        port: 3000
    },
    plugins: [
        new webpack.DefinePlugin({
            __PROD__: JSON.stringify(process.env.NODE_ENV === "PROD"),
        }),
        new CopyWebpackPlugin([{
            from: 'public'
        }]),
    ],
};