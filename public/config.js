'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'TellForm';
	var applicationModuleVendorDependencies = ['ui.select', 'ngSanitize', 'vButton', 'ngResource', 'TellForm.templates', 'ui.router', 'ui.bootstrap', 'ui.utils', 'pascalprecht.translate', 'view-form'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
