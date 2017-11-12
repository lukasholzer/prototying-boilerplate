const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=http://localhost:4000/__webpack_hmr&timeout=2000&reload=true';

const entry = {};
for (let name in commonConfig.entry) {
  if (commonConfig.entry.hasOwnProperty(name)) {
    entry[name] = [commonConfig.entry[name], hotMiddlewareScript];
  }
}

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  entry: entry,

  output: {
    path: helpers.root('public'),
    publicPath: 'http://localhost:4000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
    hotUpdateMainFilename: '[hash].hot-update.json'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'client', 'app'),
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
    loaders: [
      { 
        test: /\.twig$/, 
        loader: 'twig-loader'
      }
    ]
  },

  node: {
    fs: "empty" // avoids error messages (twig-loader)
  },

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      title: 'Custom template using Handlebars',
      template: helpers.root('app', 'index.twig'),
      inject: 'body',
      excludeAssets: [/internal.*.js/, /external.*.js/]
    })
  ]

});
