module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    uglify:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        files:
          'raphael-svg-import.min.js': ['raphael-svg-import.js']
    # qunit:
    #   all: ['tests/*.html']


  grunt.loadNpmTasks 'grunt-contrib-uglify'
  # grunt.loadNpmTasks 'grunt-contrib-qunit'

  grunt.registerTask 'default', ['uglify']
