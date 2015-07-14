'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || '',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    appConfig: appConfig,
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.authors.join(", ") %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appConfig.dist %>/**/*',
            '!<%= appConfig.dist %>/.git*'
          ]
        }]
      }
    },
    watch: {
      bower: {
        files: ['bower.json']
      },
      js: {
        files: ['<%= appConfig.app %>/src/**/*.js','!<%= appConfig.app %>/src/**/*.test.js'],
        tasks: ['newer:jshint:all'],
      },
      jsTest: {
        files: ['<%= appConfig.app %>/src/**/*.test.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.js': [
            'src/**/*.mdl.js',
            'src/**/*.svc.js'
          ]
        }
      }
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'karma',
    'clean:dist',
    'concat'
  ]);
  grunt.registerTask('test', [
    'karma'
  ]);

};
