'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module('app').requires.push(moduleName);
	};

	return {
		applicationModuleName: 'app',
		applicationModuleVendorDependencies: [
      'duScroll',
      'ui.select',
      'ngSanitize',
      'vButton',
      'ngResource',
      'app.templates',
      'ui.router',
      'ui.bootstrap',
      'ui.utils',
      'pascalprecht.translate'
    ],
		registerModule: registerModule
	};
})();
