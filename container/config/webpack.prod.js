const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// will be altered by the ci/cd pipeline
const DOMAIN = process.env.PRODUCTION.DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    // all the different files that will get built will use
    // the following format while naming them
    // name + hash value (to overcome caching issue)
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // we are assuming that the remoteEntry for marketing
        // will be nested inside the folder = 'marketing' in
        // the same domain === s3 bucket for this example
        marketing: `marketing@${DOMAIN}/marketing/remoteEntry.js`,
      },
    }),
  ],
};
