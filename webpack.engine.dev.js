var path = require('path');

module.exports = {
  entry: './src/engine_main_webpack.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'engine.dev.js',
	library: 'Engine',
	libraryTarget: 'var',
    path: path.resolve(__dirname, 'build')
  },
  watch: true,
     externals: [
      'vue',
    ],

};

