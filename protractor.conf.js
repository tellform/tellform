'use strict';

// Protractor configuration
exports.config = {
	plugins : [{
		path: './node_modules/protractor-istanbul-plugin/index.js'
	}],
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['app/e2e_tests/login.e2e.test.js'],
	beforeLaunch: './server.js',
	jasmineNodeOpts: {
		onComplete: function () {},
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 90000
	}
};
