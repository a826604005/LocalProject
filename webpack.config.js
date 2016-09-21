var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var outputFilename = '[name].js';

var plugins = [
  //new webpack.optimize.UglifyJsPlugin({ minimize: false }),
  //new HtmlWebpackPlugin({
    //filename: './index.html',
    //template: './app/index.html'
  //})
];

if (process.env.COMPRESS) {
  plugins.push(
    new ExtractTextPlugin('[name].[contenthash:6].css'),
    new webpack.optimize.OccurenceOrderPlugin()
  );

  outputFilename = '[name].[chunkhash:6].js';
} else {
  plugins.push(
    new ExtractTextPlugin('[name].css')
  );
}

module.exports = {
  entry: {
    app: './app/index.js',
    vendor: './app/vendor.js'
  },

  output: {
    path: './dist',
    filename: outputFilename
  },

  resolve: {
    root: [ path.resolve('./app') ],
    extensions: [ '', '.js' ]
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: [ 'babel-loader', 'eslint-loader' ] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') },
      { test: /\.html$/, exclude: /\.raw/, loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname) + '!html' },
      { test: /\.(gif|png|jpg|svg|ttf|woff2|woff|eot)$/, loader: 'url?limit=1000&name=[path][name].[hash:6].[ext]' }
    ]
  },

  eslint: {
    failOnWarning: true
  },

  postcss: function() {
    return [
      require('postcss-import')({
        path: [],
        onImport: function(files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),

      require('postcss-nested'),
      require('postcss-opacity'),
      require('postcss-cssnext')({ browsers: ['iOS >= 7', 'Android >= 4.0', 'last 2 versions'] })
     ];
  },

  plugins: plugins
};
