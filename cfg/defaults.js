/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;
let ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包

/**
 * [getDefaultModules description dist的module]
 * @return {[type]} [description]
 */
function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer'])
      },
      {
        test: /\.sass/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        exclude: /^node_modules$/,
        loader:ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'less'])
        // loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
          test: /\.(png|jpeg|gif)$/,
          loader: 'file-loader?name=../images/[name].[ext]'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        exclude: /^node_modules$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        exclude: /^node_modules$/,
        loader: 'file-loader'
      }
    ]
  };
}

/**
 * [getDefaultModulesByDev description dev的module]
 * @return {[type]} [description]
 */
function getDefaultModulesByDev() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.sass/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /^node_modules$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: '/images/[hash].[ext]'
        }
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        exclude: /^node_modules$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        exclude: /^node_modules$/,
        loader: 'file-loader'
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  getDefaultModulesByDev:getDefaultModulesByDev
};
