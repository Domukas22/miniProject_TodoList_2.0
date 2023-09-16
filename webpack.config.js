const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]', //name of assets stay the same
    },
    devtool: 'source-map', //generates a source map -> shows where error occured 
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"), // specify the location of static files that should be served by the development server
        }, 
        open: true, //opens browser automatically after running webpack
        hot: true, //shows changes without refrashing the page
        compress: true,
        historyApiFallback: true,
       
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TodoList 2.0',
            filename: 'index.html',
            template: 'src/homeTemplate.html'
        }), 
    ]
}   