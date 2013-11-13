module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    jshint:
      all: ['raphael-svg-import.js']
    qunit:
      all: ['tests/qunit*.html']
    uglify:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        files:
          'raphael-svg-import.min.js': ['raphael-svg-import.js']


  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-qunit'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', ['jshint', 'qunit', 'uglify']
  grunt.registerTask 'test', ['jshint', 'qunit']
