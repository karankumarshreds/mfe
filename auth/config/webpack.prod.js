const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/auth/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

/**
 * @publicPath
 * setting /marketing/latest/ prefix such that remoteEntry.js
 * file which points other services to the build files of our
 * project will point to the correct domain.
 * Which is <domain_name>/marketing/latest/ ,, because this is
 * where our marketing files are in the s3 bucket
 * Otherwise, it would have pointed to <domain>/main.js etc
 * which is wrong.
 */
