var path = require("path");
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //独立出css样式
module.exports = {
    entry: getEntrySources(['./src/js/index.js']),
    output: {
        path: path.resolve(__dirname, "build"),  //打包输出的路径
        publicPath: 'http://localhost:8080/',  //html引用路径
        filename: 'js/bundle.js'   
    },
    devtool: 'eval',
    devServer: {
        port: 8080,
        host: '127.0.0.1'
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'source-map'
            }
        ],
        loaders: [
            {
                test: /\.scss$/,
                include: /src/,
                //loader:ExtractTextPlugin.extract("style", "css!sass")
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 3 versions', //解析CSS文件并且添加浏览器前缀到CSS规则里
                    'sass?outputStyle=expanded'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192', //只有不大于8kb的图片才会打包处理成Base64的图片
                    'img'
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'react-hot'
                    ,
                    'babel?presets[]=stage-0,presets[]=react,presets[]=es2015'
                ]
            }
        ],
        plugins:[new UglifyJsPlugin()
            // new ExtractTextPlugin('css/[name].css', {
            //     allChunks: false
            // })
        ]
    }
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}