const __PATH                = require('./paths');
const { merge }             = require('webpack-merge');
const common                = require('./webpack.common.js');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode:     'production',
  devtool:  'source-map',

  output: {
    path:           __PATH.build,
    publicPath:     '/',
    filename:       '[name].js',
    library:        '[name]',
    libraryTarget:  'umd',
    umdNamedDefine: true,
    libraryExport:  'default'
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
            loader: 'sass-loader',
            options: {
              sassOptions: {
                minimize: false,
                outputStyle: 'expanded'
              }
            }
          }

        ]
      }

    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // minimize: false
    }),
  ],

  optimization: {
    minimize:   false,
    // minimizer:  [ new TerserPlugin() ],
  },
})
