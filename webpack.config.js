var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var path = require('path');

module.exports = {
    entry: {
        'main': ['./index', './test.js']
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|jpg|ico|gif)$/i,
                loader: 'url-loader?limit=8192'
            },        
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    
    plugins: [
        new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
        new WriteFilePlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            template: './template.html',
            filename: 'index.html',
            inject: true
        }),
    ],

    resolve: {
        extensions: ['.js', '.vue']
    },

    externals: {
        vue: 'Vue'
    }
}
