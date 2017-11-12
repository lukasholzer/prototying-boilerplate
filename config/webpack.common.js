const webpack = require('webpack');
const helpers = require('./helpers');

module.exports = {

  entry: {
    // Script entry files
    'polyfills': helpers.root('app', 'scripts', 'polyfills.ts'),
    'vendor': helpers.root('app', 'scripts', 'vendor.ts'),
    'app': helpers.root('app', 'scripts', 'main.ts'),

    'inline': helpers.root('app', 'styles', 'above.scss'),
    'main': helpers.root('app', 'styles', 'main.scss')
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: helpers.root('app', 'scripts', 'tsconfig.json')
          }
        }
      }, 
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),

    // creates 3 junks, does code splitting
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};
