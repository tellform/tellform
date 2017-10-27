'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('de', {
		MENU: 'MENÜ',
		SIGNUP_TAB: 'Vi Phrasal',
		SIGNIN_TAB: 'Accedi',
		SIGNOUT_TAB: 'Esci',
		EDIT_PROFILE: 'Modifica Profilo',
		MY_SETTINGS: 'Mie Impostazioni',
		CHANGE_PASSWORD: 'Cambia la password',
		TOGGLE_NAVIGATION: 'Attiva la navigazione'
	});
}]);
