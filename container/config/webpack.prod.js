const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// will be altered by the ci/cd pipeline
const DOMAIN = process.env.PRODUCTION_DOMAIN || 'http://localhost:8081';

const prodConfig = {
  mode: 'production',
  output: {
    // all the different files that will get built will use
    // the following format while naming them
    // name + hash value (to overcome caching issue)
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // we are assuming that the remoteEntry for marketing
        // will be nested inside the folder = 'marketing' in
        // the same domain === s3 bucket for this example
        marketing: `marketing@${DOMAIN}/marketing/latest/remoteEntry.js`,
        auth: `auth@${DOMAIN}/auth/latest/remoteEntry.js`,
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
 * Hence, putting that it will have a filename
 * of something like 'main.<random-hash>.js'
 * and will be loaded as
 * ***********************************************
 * s3:url/container/latest/main.<random-hash>.js
 */
