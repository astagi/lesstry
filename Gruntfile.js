module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
        files: {
          'js/build/build.min.js': ['js/d3.min.js', 'js/chart.js']
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["css"],
          compress: true
        },
        files: {
          "css/build/build.css": "css/main.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify','less']);

};