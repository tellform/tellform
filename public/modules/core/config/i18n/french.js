'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('fr', {
		MENU: 'MENU',
		SIGNUP_TAB: 'Créer un compte',
		SIGNIN_TAB: 'Connexion',
		SIGNOUT_TAB: 'Créer un compte',
		EDIT_PROFILE: 'Modifier mon profil',
		MY_SETTINGS: 'Mes paramètres',
		CHANGE_PASSWORD: 'Changer mon mot de passe',
		TOGGLE_NAVIGATION: 'Basculer la navigation',
	});
}]);
