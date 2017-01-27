var path = require('path');
var webpack = require('webpack');
var env = require('./server-src/env.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    client: path.join(__dirname, "/client-src/entry.jsx"),
  },
  output: {
    path: path.join(__dirname, "/client-build"),
    filename: "/js/[name].[hash].js",
    publicPath: env.assetBaseUrl
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "client-src/css/"),
        loader: 'style-loader!css-loader?minimize'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['syntax-decorators', 'react-hot-loader/babel']
        },
        include: path.resolve(__dirname, 'client-src/')
      },
      {
        test: /\.(png|gif|ico|svg|jpg|json|xml)$/,
        include: path.resolve(__dirname, "client-src/images/"),
        loader: "url-loader?limit=100000&name=/images/[hash:6].[ext]" /*100kB*/
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        include: path.resolve(__dirname, "client-src/images/"),
        loader: "image-webpack-loader?optimizationLevel=7"
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client-src/index.html',
      xhtml: true,
      minify: env.isDebug ? false : {}
    }),
    new webpack.DefinePlugin({
      DEBUG: env.isDebug,
      PRODUCTION: env.isProduction,
      STAGING: env.isStaging,
      HOST_URL: JSON.stringify(env.hostUrl),
      // NOTE: This is just a trick optimization. There are typically a lot of these in libs
      'process.env.NODE_ENV': JSON.stringify(env.current),
    }),
    new CleanWebpackPlugin(['client-build'], {
      // Without `root` CleanWebpackPlugin won't point to our
      // project and will fail to work.
      root: process.cwd()
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin()
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    readline: 'empty',
  },
  devServer: {
    contentBase: "client-build/",
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    port: env.webpackDevServerPort,
    watchOptions: {
      poll: 1000
    }
  }
};

if (!env.isDebug){
  // Uglify
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}
