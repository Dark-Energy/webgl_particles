var path = require('path');

module.exports = {
  entry: './src/gui_main_webpack.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'editor.gui.js',
	library: 'Editor_Gui',
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



