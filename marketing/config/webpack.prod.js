const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

/**
 * @publicPath
 * This will make sure that html plugin appends this
 * path before adding all the script tags to the index.html
 * so that we load up the correct js files from the container
 * folder from the s3 bucket
 * If not done, it will just add the domain name (bucket/cdn url)\
 * which would try and load the main.js(webpack file) from the
 * root of the s3 bucket and throw an error :
 * ***********************************************
 * Uncaught SyntaxError: Unexpected token '<'
 * ***********************************************
 */
