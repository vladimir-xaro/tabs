const __PATH                = require('./paths');
const { merge }             = require('webpack-merge');
const common                = require('./webpack.common.js');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode:     'development',
  devtool:  'source-map',

  entry: {
    Tabs: __PATH.src + '/index.dev.ts'
  },

  output: {
    path:           __PATH.dev,
    publicPath:     '/',
    filename:       '[name].dev.js',
    chunkFilename:  'js/chunks/[name]-[id].js'
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [

          {
            loader: MiniCssExtractPlugin.loader
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'sass-loader'
          }

        ]
      }

    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].dev.css',
      // minimize: false
    }),
  ],
})
