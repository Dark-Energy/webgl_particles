var path = require('path');

module.exports = {
  entry: './src/engine_main_webpack.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'engine.js',
	library: 'Engine',
	libraryTarget: 'var',
    path: path.resolve(__dirname, 'build')
  },

};

//production config
module.exports.devtool = '#source-map';
module.exports.output.filename = 'engine.js';

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
  
