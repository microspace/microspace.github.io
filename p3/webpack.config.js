var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')


var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
})


module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'src/main.js'),
/*             path.resolve(__dirname, 'node_modules/blockly/blockly_compressed.js'),
            path.resolve(__dirname, 'node_modules/blockly/blocks_compressed.js'),
            path.resolve(__dirname, 'node_modules/blockly/javascript_compressed.js'),
            path.resolve(__dirname, 'node_modules/blockly/msg/js/ru.js'), */

        ],
    },
    devtool: 'cheap-source-map',

    watch: true,
    plugins: [
        definePlugin,
        //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html',
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './dev']
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, ]
    }
}
