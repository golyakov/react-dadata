const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './demo/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    }),
    new MiniCssExtractPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'demo/index.html')
    })
  ],
  devtool: 'inline-source-map',
  bail: true,
  mode: 'development'
};
