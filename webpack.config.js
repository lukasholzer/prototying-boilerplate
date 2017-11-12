const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'inline': path.resolve('app', 'styles', 'inline.scss'),
    'main': path.resolve('app', 'styles', 'external.scss')
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },

  module: {
    rules: [
      // Typescript
      {
        test: /\.ts$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve('tsconfig.json')
          }
        }
      },
      // Styles
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'client', 'app'),
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}