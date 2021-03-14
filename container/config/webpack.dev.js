// helps you merge two different webpack configs
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

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
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      // shared: ['react', 'react-dom']
      /**
       * OR
       * */
      shared: packageJson.dependencies,
    }),
  ],
};

// this merges both configs
// sequence matters, coinciding config elements
// will be used for the later config
// ie. in this case === devConfig
module.exports = merge(commonConfig, devConfig);
