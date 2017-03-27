'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Permission Constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('APP_PERMISSIONS', {
	viewAdminSettings: 'viewAdminSettings',
	editAdminSettings: 'editAdminSettings',
	editForm: 'editForm',
	viewPrivateForm: 'viewPrivateForm'
});

//User Role constants
angular.module(ApplicationConfiguration.applicationModuleName).constant('USER_ROLES', {
	admin: 'admin',
	normal: 'user',
	superuser: 'superuser'
});

//form url
angular.module(ApplicationConfiguration.applicationModuleName).constant('FORM_URL', '/forms/:formId');

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
