module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      jslib: {
        src: ['src/assets/script/angular.js', 'src/assets/script/jquery.js', 'src/assets/script/angular-checklist-model.js'],
        dest: 'dist/script/lib.js'
      },
      jsmod: {
        src: ['src/app/**/*.js'],
        dest: 'dist/script/script.js'
      }
    },
    uglify: {
      jsmondmin: {
        options: {
          sourceMap: false,
          beautify: false,
          mangle: false
        },
        files: {
          'dist/script/script.min.js': ['dist/script/script.js']
        }
      },
      jslibmin: {
        options: {
          sourceMap: false,
          beautify: false,
          mangle: false
        },
        files: {
          'dist/script/lib.min.js': ['dist/script/lib.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};