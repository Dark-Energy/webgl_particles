var webpack = require("webpack");    
var path = require('path');

var config = {
  entry: './src/engine_main_webpack.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),  
    filename: 'dev.engine.js',
	library: 'Engine',
	libraryTarget: 'var',
  },
   watch: true,
   module: { rules: [ ], },	
   };

console.log(config.output.path);

var compiler = webpack( config
, function(err, stats) {
    if (err) {
        console.log("error");
        console.log(err);
    }
    else {
        console.log("some state");
        console.log(stats);
   }
});
