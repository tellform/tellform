'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('fr', {
		MENU: 'MENU',
		SIGNUP_TAB: 'Créer un compte',
		SIGNIN_TAB: 'Connexion',
		SIGNOUT_TAB: 'Déconnexion',
		EDIT_PROFILE: 'Modifier Mon Profil',
		MY_SETTINGS: 'Mes Paramètres',
		CHANGE_PASSWORD: 'Changer mon Mot de Pass',
		TOGGLE_NAVIGATION: 'Basculer la navigation',
	});
}]);
