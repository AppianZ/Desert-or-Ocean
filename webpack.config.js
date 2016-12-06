/**
 * Created by appian on 2016/11/30.
 */
/**
 * Created by JW on 2016/2/3.
 */
var path = require('path');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		contentBase: './',
		port: 8200
	},
	entry : {
		index : './test/index.js',
		test: './test/test.js'
	},
	plugins : [
	],
	output : {
		path :  path.join(__dirname,'dist'),
		filename : '[name].bundle.js'
	},
	module : {
		loaders :[{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.js$/,
			exclude: path.resolve('./node_modules'),
			loader: 'babel',
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url'
		}]
	}
}
console.log('当前环境为' + process.env.NODE_ENV);
if (process.env.NODE_ENV == 'production'){
	module.exports.plugins = (module.exports.plugins).concat([
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	])
}else {
	module.exports.plugins = (module.exports.plugins).concat([
		new OpenBrowserPlugin({
			url: 'http://localhost:8200'
		})
	])
}
