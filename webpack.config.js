const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cwd = process.cwd();
const modules = fs.readdirSync('./app/modules');
const entryConfig = {};
modules.forEach((page) => {
  entryConfig[page] = ['./app/modules', page, 'index.jsx'].join('/');
});
entryConfig.app = './app/style/app.less';

module.exports = {
  entry: entryConfig,
  output: {
    path: path.resolve(cwd, './build'),
    filename: 'scripts/[name].js',
    sourceMapFilename: '[name].js.map',
  },
  externals: {
    react: 'const React',
    'react-dom': 'const ReactDOM',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: [
          path.resolve(cwd, './app'),
        ],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        },
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract([
          'css?SourceMap',
          'less?SourceMap',
        ].join('!')),
      },
    ],
  },
  resolve: {
    root: [
      path.resolve(cwd, './node_modules'),
    ],
  },
  resolveLoader: {
    modulesDirectories: [
      'node_modules',
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  plugins: [
    // SourceMap plugin will define process.env.NODE_ENV as development
    // new webpack.SourceMapDevToolPlugin({
    //   columns: false,
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
      },
    }),
    new ExtractTextPlugin('style/[name].css'),
  ],
};
