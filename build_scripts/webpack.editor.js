var path = require('path');

module.exports = {
  entry: './src/editor_webpack_dev.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'dev.editor.js',
	library: 'Engine',
	libraryTarget: 'var',
    path: path.resolve(__dirname, 'build')
  },
  watch: true,
     externals: [
      'vue',
    ],
	
   module: { rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ], 
	},	

};

var webpack = require('webpack')

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.output.filename = 'prod.build.js',
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} 