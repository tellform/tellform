'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('se', {
		MENU: 'MENY',
		SIGNUP_TAB: 'Registrera konto',
		SIGNIN_TAB: 'Logga In',
		SIGNOUT_TAB: 'Logga Ut',
		EDIT_PROFILE: 'Redigera Profil',
		MY_SETTINGS: 'Mina Inställningar',
		CHANGE_PASSWORD: 'Byt Lösenord',
		TOGGLE_NAVIGATION: 'Växla navigation'
	});

}]);
