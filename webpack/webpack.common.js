const __PATH = require('./paths');

module.exports = {
  entry: {
    Tabs: __PATH.src + '/index.ts'
  },

  output: {
    assetModuleFilename: 'assets/[name][ext]'
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        // exclude: /node_modules/,
        options: {
          allowTsInNodeModules: true
        }
      },

    ],
  },


  experiments: {
    asset: true,
  },


  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },


  resolve: {
    extensions: ['.ts', '.js', '.scss', '.json']
  }
}