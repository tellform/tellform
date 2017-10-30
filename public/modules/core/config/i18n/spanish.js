'use strict';

angular.module('core').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('es', {
		MENU: 'MENU',
		SIGNUP_TAB: 'Registrarse',
		SIGNIN_TAB: 'Entrar',
		SIGNOUT_TAB: 'Salir',
		EDIT_PROFILE: 'Editar Perfil',
		MY_SETTINGS: 'Mis configuraciones',
		CHANGE_PASSWORD: 'Cambiar contraseña',
		TOGGLE_NAVIGATION: 'Navegación de palanca'
	});

}]);
