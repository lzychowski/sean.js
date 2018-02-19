var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');

module.exports = {
  entry: {
    'polyfills': './src/web/polyfills.ts',
    //'vendor': './src/vendor.ts',
    'app': './src/web/main.ts'
    //'app-js-imports': './src/assets/js/js-imports.js'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    descriptionFiles: ["package.json", "bower.json"],
    modules: ["node_modules", "bower_components"],
    alias: {

    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          },
          'angular-router-loader',
          'angular2-template-loader'
        ]
      },
      { test: /pixi\.js/, loader: 'expose-loader?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
      { test: /p2\.js/, loader: 'expose-loader?p2' },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /carousel2\.json$/,
        loader: 'file-loader?name=assets/data/carousel2.json'
      },
      {
        test: /sw\.js$/,
        loader: 'file-loader?name=sw.js'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src','web', 'app', 'assets', 'css'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'web', 'app', 'assets', 'css'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src/web'), // location of your src
      {} // a map of your routes
    ),

    // 'app-plugins', 
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills', 'app-js-imports']
    }),

    new HtmlWebpackPlugin({
      template: 'src/web/index.html'
    })

  ]
};

