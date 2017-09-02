var path = require('path');

module.exports = {
  entry: './src/editor_webpack_dev.js',  
  devtool: 'inline-source-map',
  output: {
    filename: 'editor.build.js',  
	library: 'Engine',
	libraryTarget: 'var',
    path: path.resolve(__dirname, 'build')
  },
	
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

//production config
module.exports.devtool = '#source-map';
module.exports.output.filename = 'prod.build.js';

var webpack = require('webpack');
  // http://vue-loader.vuejs.org/en/workflow/production.html
  
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      sourceMap: true,
      mangle: false,
      /*mangle: {
        keep_fnames: true, //dont mangle function names
        keep_classnames: true, //dont mangle class names
      },*/
      compress: false,
      comments: false
    })
  ]) ;
  
