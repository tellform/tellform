'use strict';

// Protractor configuration
exports.config = {
	framework: 'mocha',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['app/e2e_tests/*.js']
};
