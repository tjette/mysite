var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: [
    'webpack-hot-middleware/client',
    './client/index'
    ],
    blogForm: [
    'webpack-hot-middleware/client',
    './client/blogForm'
    ],
     blogList: [
    'webpack-hot-middleware/client',
    './client/blogIndex'
    ]
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/static/',
    plugins: [ new webpack.optimize.CommonsChunkPlugin("init.js")]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    }]
  }
};
