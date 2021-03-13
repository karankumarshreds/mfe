module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};

/**
 * @rules
 * we define loaders inside the rules
 */

/**
 * @loader
 * The goal of loader is to process the files
 * that we try and import into our projects
 */

/**
 * @test
 * This property tells, any files ending with
 * .mjs or .js, we want it to be processed by babel
 */
