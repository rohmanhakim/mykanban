const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app:    path.join(__dirname,'app'),
  build:  path.join(__dirname,'build')
};
process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['','.js','.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style','css'],
        include: [ PATHS.app ]
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        include: PATHS.app
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET){
  module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true
      }),
      new DashboardPlugin()
    ]
  });
}

if(TARGET === 'build'){
  module.exports = merge(common, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      // Setting DefinePlugin affects React library size!
      // DefinePlugin replaces content "as is" so we need some extra quotes
      // for the generated code to make sense
      new webpack.DefinePlugin({
        'process.env.NODE_ENV':'"production"'

        // You can set this to JSON.stringify('development') for your
        // development module
        // no matter what
      }),
    ]
  });
}
