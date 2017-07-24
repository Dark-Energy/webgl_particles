﻿// Project configuration. 
module.exports = function(grunt) {
	grunt.initConfig({
	uglify: {
    options: {
      mangle: true
    },
      build: {
        src: ['src/utils/*.js', 'src/particles/my_lib.js', 'src/particles/*.js', 'src/gui/vueapp.js', 'src/gui/*.js', 'src/app/*.js'],
        dest: 'build/particles.min.js'
      }
	},
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('default', ['uglify']);
//grunt.loadNpmTasks('grunt-contrib-concat');
//grunt.registerTask('default', ['concat']);


};