'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('de', {
		MENU: 'MENÜ',
		SIGNUP_TAB: 'Anmelden',
		SIGNIN_TAB: 'Anmeldung',
		SIGNOUT_TAB: 'Abmelden',
		EDIT_PROFILE: 'Profil bearbeiten',
		MY_FORMS: 'Meine Formulare',
		MY_SETTINGS: 'Meine Einstellungen',
		CHANGE_PASSWORD: 'Passwort ändern'
	});
}]);
