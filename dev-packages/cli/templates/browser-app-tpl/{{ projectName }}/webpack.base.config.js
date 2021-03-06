const path = require('path');
const yargs = require('yargs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { mode } = yargs.option('mode', {
  description: "Mode to use",
  choices: ['development', 'production'],
  default: 'production'
}).argv;
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: mode,
  devtool: mode === 'development' ? 'inline-source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: /jsonc-parser|node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './template.yml'),
        to: outputPath
      }
    ])
  ]
};
