// Generated on 2014-03-24 using generator-angular-fullstack 1.3.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('jit-grunt')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.loadNpmTasks('grunt-instrument');

	// Define the configuration for all the tasks
	grunt.initConfig({


		// Empties folders to start fresh
		clean: {
			coverageE2E: {
				contents: ['coverage/e2e']
			}
		},

		// start - code coverage settings
		instrument: {
			files: ['app/**.js', 'public/*.js', 'public/modules/**.js'],
			options: {
				lazy: true,
				basePath: 'coverage/e2e/instrumented'
			}
		},

		makeReport: {
			src: 'coverage/e2e/instrumented/*.json',
			options: {
				type: 'html',
				dir: 'coverage/e2e/reports',
				print: 'detail'
			}
		},


		protractor_coverage: {
			options: {
				configFile: 'protractor.conf.js', // Default config file
				keepAlive: true, // If false, the grunt process stops when the test fails.
				noColor: false, // If true, protractor will not use colors in its output.
				coverageDir: 'coverage/e2e/instrumented',
				args: {}
			}
		}
	});

	grunt.registerTask('default', [
		'clean:coverageE2E',
		'instrument',
		'protractor_coverage',
		'makeReport'
	]);
};
