'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('fr', {
		MENU: 'MENU',
		SIGNUP_TAB: 'Créer un Compte',
		SIGNIN_TAB: 'Connexion',
		SIGNOUT_TAB: 'Créer un compte',
		EDIT_PROFILE: 'Modifier Mon Profil',
		MY_FORMS: 'Mes Formulaires',
		MY_SETTINGS: 'Mes Paramètres',
		CHANGE_PASSWORD: 'Changer mon Mot de Pass'
	});
}]);
