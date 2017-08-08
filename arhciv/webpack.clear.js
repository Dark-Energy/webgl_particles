var path = require('path');

module.exports = {
  entry: './src/main_test.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'shit.js',
	library: 'Engine',
	libraryTarget: 'var',
    path: path.resolve(__dirname, 'build')
  },
     externals: [
      'vue',
    ],
	
   module: { rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ], 
	},	

};

var webpack = require('webpack')
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
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