'use strict';

/**
 * Module dependencies.
 */
var applicationConfiguration = require('./config/config'),
	bowerFiles = require('main-bower-files');

var bowerDep = bowerFiles('**/**.js');

// Karma configuration
module.exports = function(config) {
	config.set({
		// Frameworks to use
		frameworks: ['jasmine'],

		// List of files / patterns to load in the browser
		files: bowerDep.concat(applicationConfiguration.assets.js, applicationConfiguration.assets.tests, applicationConfiguration.assets.views),

		// Test results reporter to use
		// Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['mocha', 'html', 'progress'], 

		preprocessors: {
		    'public/modules/**/*.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
		    stripPrefix: 'public/',

		    // the name of the Angular module to create
    		moduleName: 'module-templates'
		},

		// Web server port
		port: 9876,

		// Enable / disable colors in the output (reporters and logs)
		colors: true,

		//Make sure we capture console.log output
		client: {
	      captureConsole: true,
	      mocha: {
	        bail: true
	      }
	    },

		// Level of logging
		// Possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// Enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// If true, it capture browsers, run tests and exit
		singleRun: false
	});
};
