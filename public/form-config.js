'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'TellForm-Form';
	var applicationModuleVendorDependencies = [
		'duScroll', 'ui.select', 'ui.grid', 'ui.grid.edit', 'ui.grid.pagination',
		'ui.grid.selection', 'ngAnimate', 'ngSanitize', 'vButton', 'ngResource',
		'TellForm.templates', 'ui.router', 'ui.bootstrap', 'ui.utils',
		'pascalprecht.translate', 'colorpicker.module'
	];

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
