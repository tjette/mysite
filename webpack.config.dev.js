var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    }]
  }
};