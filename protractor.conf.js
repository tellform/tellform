'use strict';

// Protractor configuration
exports.config = {
	allScriptsTimeout: 110000,

	plugins : [{
		path: './node_modules/protractor-istanbul-plugin',
		logAssertions: true,
		failAssertions: true,
		outputPath: 'e2e_coverage'
	}],
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['./app/e2e_tests/create-form.e2e.test.js'],
	beforeLaunch: './server.js',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
