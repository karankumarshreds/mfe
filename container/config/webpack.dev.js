// helps you merge two different webpack configs
const { merge } = require('webpack-merge');
// takes our html file and adds script tags to it
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

// config for the development environment
const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    //
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
    }),
  ],
};

// this merges both configs
// sequence matters, coinciding config elements
// will be used for the later config
// ie. in this case === devConfig
module.exports = merge(commonConfig, devConfig);
