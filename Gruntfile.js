module.exports = function(grunt) {
  grunt.registerTask('watch', [ 'watch' ]);
  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: [
          'doc/index.js',
          'static/ventor/*.js',
          'static/js/*.js'
        ],
        dest: 'static/dest/main.min.js'
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'static/dest/main.min.js': ['static/dest/main.min.js'],
        }
      }
    },
    watch: {
      js: {
        files: ['static/js/*.js', 'doc/index.js'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          livereload: true,
        }
      },
	  html:{
        files: ['index.html'],
        options: {
          livereload: true,
        }
	  },
      css: {
        files: ['static/css/*.css'],
        options: {
          livereload: true,
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
