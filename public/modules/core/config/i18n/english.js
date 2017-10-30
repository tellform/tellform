'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {
		MENU: 'MENU',
		SIGNUP_TAB: 'Sign Up',
		SIGNIN_TAB: 'Sign In',
		SIGNOUT_TAB: 'Signout',
		EDIT_PROFILE: 'Edit Profile',
		MY_SETTINGS: 'My Settings',
		CHANGE_PASSWORD: 'Change Password',
		TOGGLE_NAVIGATION: 'Toggle navigation'
	});

	$translateProvider.preferredLanguage('en')
		.fallbackLanguage('en')
		.useSanitizeValueStrategy('escape');

}]);
