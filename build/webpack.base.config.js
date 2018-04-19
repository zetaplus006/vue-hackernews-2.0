const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const WatchTimestampsPlugin = require('./watchTimestampsPlugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // webpack 4.x 与 ts-loader4.x 有问题，ts-loder回退3.5
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: { appendTsxSuffixTo: [/\.vue$/] }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.styl(us)?$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true }
              },
              'stylus-loader'
            ],
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.less$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            use: [
              {
                loader: 'typings-for-css-modules-loader',
                options: {
                  modules: true,
                  namedExport: true,
                  camelCase: true,
                  minimize: true,
                  localIdentName: "[local]_[hash:base64:5]"
                }
              },
              'less-loader'
            ],
            fallback: 'vue-style-loader'
          })
          : [
            'vue-style-loader',
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                camelCase: true,
                minimize: false,
                localIdentName: "[local]_[hash:base64:5]"
              }
            },
            'less-loader'
          ]
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
      new VueLoaderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      }),
      new webpack.WatchIgnorePlugin([
        /less\.d\.ts$/
      ]),
      new WatchTimestampsPlugin([
        /less\.d\.ts$/,
      ])
    ]
    : [
      new VueLoaderPlugin(),
      new FriendlyErrorsPlugin(),
      new webpack.WatchIgnorePlugin([
        /less\.d\.ts$/
      ]),
      // new WatchTimestampsPlugin([
      //   /less\.d\.ts$/,
      // ])
    ]
}
