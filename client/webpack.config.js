const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  performance: {
    hints: false
  },
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, 'src'),
    proxy: {
      '/graphql': 'http://localhost:3000'
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /(\.scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Events booking',
    filename: 'index.html',
    template: './src/index.html'
  })]
}