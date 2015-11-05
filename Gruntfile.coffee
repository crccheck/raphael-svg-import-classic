module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    qunit:
      all: ['tests/qunit*.html']
    uglify:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        files:
          'raphael-svg-import.min.js': ['raphael-svg-import.js']
    connect:
      server:
        options:
          livereload: true
    watch:
      tests:
        files: ['raphel-svg-import.js', 'tests/qunit*.*']
        options:
          spawn: false
          livereload: true


  grunt.loadNpmTasks 'grunt-contrib-qunit'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['qunit', 'uglify']
  grunt.registerTask 'test', ['qunit']
  grunt.registerTask 'dev', ['connect', 'watch']
