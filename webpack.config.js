const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const cwd = process.cwd();
const modules = fs.readdirSync('./app/modules');
const entryConfig = {};
modules.forEach((page) => {
  entryConfig[page] = ['./app/modules', page, 'index.jsx'].join('/');
});

module.exports = {
  entry: entryConfig,
  output: {
    path: path.resolve(cwd, './build'),
    filename: '[name].js',
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
  ],
};
