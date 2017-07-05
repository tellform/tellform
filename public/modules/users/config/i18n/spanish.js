'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('es', {
		ACCESS_DENIED_TEXT: 'Tenes que estar logueado para acceder a esta página',
		USERNAME_OR_EMAIL_LABEL: 'Usuario o Email',
		USERNAME_LABEL: 'Usuario',
		PASSWORD_LABEL: 'Contraseña',
		CURRENT_PASSWORD_LABEL: 'Contraseña actual',
		NEW_PASSWORD_LABEL: 'Nueva contraseña',
		VERIFY_PASSWORD_LABEL: 'Verificar contraseña',
		UPDATE_PASSWORD_LABEL: 'Actualizar contraseña',
		FIRST_NAME_LABEL: 'Nombre',
		LAST_NAME_LABEL: 'Apellido',
		LANGUAGE_LABEL: 'Idioma',
		EMAIL_LABEL: 'Email',

		SIGNUP_ACCOUNT_LINK: '¿No tenes cuenta? Resgistrate acá',
		SIGN_IN_ACCOUNT_LINK: '¿Ya tenes cuenta? Entra acá',
		SIGNUP_HEADER_TEXT: 'Registrar',
		SIGNIN_HEADER_TEXT: 'Entrar',

		SIGNUP_ERROR_TEXT: 'No se pudo terminacr la registración por errores',
		ENTER_ACCOUNT_EMAIL: 'Ingresa tu correo electrónico.',
		RESEND_VERIFICATION_EMAIL: 'Reenviar email de verificación',
		SAVE_CHANGES: 'Grabar cambios',

		UPDATE_PROFILE_BTN: 'Actualizar perfil',
		PROFILE_SAVE_SUCCESS: 'Perfil actualizado satisfactoriamente',
		PROFILE_SAVE_ERROR: 'No se pudo grabar el perfil.',

		FORGOT_PASSWORD_LINK: '¿Olvista la contraseña?',
		REVERIFY_ACCOUNT_LINK: 'Reenviar email de verficación',

		SIGNIN_BTN: 'Entrar',
		SIGNUP_BTN: 'Registrar',
		SAVE_PASSWORD_BTN: 'Grabar contraseña',

		SUCCESS_HEADER: 'Ingresaste exitosamente',
		SUCCESS_TEXT: 'Te registraste exitosamente una cuenta en TellForm.',
		VERIFICATION_EMAIL_SENT: 'Un email de verificación fue enviado',
		NOT_ACTIVATED_YET: 'Tu cuenta aún no esta activa',
		BEFORE_YOU_CONTINUE: 'Antes de continuar asegurate de leer el email de verificación que te enviamos. Si no lo recibis en 24hs escribinos a ',
		CHECK_YOUR_EMAIL: 'Lee el email y hace click en el link de activación para activar la cuenta. Si tenes alguna pregunta escribinos a ',

		PASSWORD_RESTORE_HEADER: 'Restaurar la contraseña',
		ENTER_YOUR_EMAIL: 'Ingresa el email de tu cuenta.',
		SUBMIT_BTN: 'Enviar',

		ASK_FOR_NEW_PASSWORD: 'Pedir reset de contraseña',
		PASSWORD_RESET_INVALID: 'El reseto de la contraseña es invalida',
		PASSWORD_RESET_SUCCESS: 'Contraseña exitosamente reseteada',
		PASSWORD_CHANGE_SUCCESS: 'Contraseña exitosamente cambiada',

		CONTINUE_TO_LOGIN: 'Ir a la página de ingreso',

		VERIFY_SUCCESS: 'Cuenta activada existosamente',
		VERIFY_ERROR: 'El link de verificación es invalido o inexistente'
	});
}]);
