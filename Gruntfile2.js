// Project configuration. 
module.exports = function(grunt) {
	grunt.initConfig({
	uglify: {
    options: {
      mangle: false
    },
      build: {
        src: ['utils/*.js', 'gui/vueapp.js', 'gui/*.js'],
        dest: 'build/gui.min.js'
      }
	},
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('default', ['uglify']);
//grunt.loadNpmTasks('grunt-contrib-concat');
//grunt.registerTask('default', ['concat']);


};