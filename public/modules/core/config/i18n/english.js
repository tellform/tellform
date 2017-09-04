'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {
		MENU_BTN: 'Menu',
		SIGNUP_TAB: 'Sign Up',
		SIGNIN_TAB: 'Sign In',
		SIGNOUT_TAB: 'Sign Out',
		MY_PROFILE: 'My Profile',
		MY_FORMS: 'My Forms',
		MY_SETTINGS: 'My Settings',
		CHANGE_PASSWORD: 'Change Password'
	});

	$translateProvider.preferredLanguage('en')
		.fallbackLanguage('en')
		.useSanitizeValueStrategy('escape');

}]);
