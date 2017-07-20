const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

module.exports = {
    entry: {
        app: capitalizeFirstLetter(path.join(__dirname, './app/main'))
    },

    output: {
        path: capitalizeFirstLetter(path.join(__dirname,'./public')),  // FS-путь к статике
        publicPath: '/', // Web-путь к статике (CDN?)
        filename: 'app.js'
    },

    watch: true,

    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.js$/,           // .../node_modules/loader!file...
                include: __dirname + '/frontend',
                loader: "babel-loader",
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.pug$/,
                loader: "pug-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }
        ]
    },

    node: {
        fs: "empty"
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]

};