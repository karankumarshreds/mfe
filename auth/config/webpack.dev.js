// helps you merge two different webpack configs
const { merge } = require('webpack-merge');
// takes our html file and adds script tags to it
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// config for the development environment
const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      // outside world will consume
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      // shared: ['react', 'react-dom'],
      shared: packageJson.dependencies,
    }),
  ],
};

// this merges both configs
// sequence matters, coinciding config elements
// will be used for the later config
// ie. in this case === devConfig
module.exports = merge(commonConfig, devConfig);
