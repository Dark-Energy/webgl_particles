// Project configuration. 
module.exports = function(grunt) {
	grunt.initConfig({
	uglify: {
      build: {
        src: ['js/*.js','demo/*.js'],
        dest: 'build/particles.min.js'
      }
	},
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('default', ['uglify']);

};