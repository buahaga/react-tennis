const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const e2c = require('electron-to-chromium');

let conf = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, './build'),
		//publicPath: 'build/',
		filename: 'main.js'
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
		  {
			test: /\.(js|jsx)$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		  },
		  {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				//fallback: 'style-loader',
				use: 'css-loader'
			})
		  },
		  /*{
			test: /\.(css|scss)$/,
			use: [
			  MiniCssExtractPlugin.loader,
			  'css-loader',
			  'postcss-loader',
			  'sass-loader'
			]
		  },*/
		  {
			test: /\.html$/,
			use: [
			  {
				loader: "html-loader",
				options: { minimize: true }
			  }
			]
		  }
		]
	},
	plugins: [
	  new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
      }),
	  new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css"
      }),
	  new ExtractTextPlugin('style.css')
	]
	//devtool: 'source-map'
};

module.exports = (env, options) => {
	let production = options.mode === 'production';
	conf.devtool = production ? false : 'eval-sourcemap';
	return conf;
}
