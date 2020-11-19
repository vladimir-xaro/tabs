const __PATH        = require('./paths');
const { merge }     = require('webpack-merge');
const common        = require('./webpack.common.js');
const TerserPlugin  = require('terser-webpack-plugin');

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

  optimization: {
    minimize:   false,
    // minimizer:  [ new TerserPlugin() ],
  },
})
