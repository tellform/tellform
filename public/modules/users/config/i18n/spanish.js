'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('es', {
		ACCESS_DENIED_TEXT: 'Tenés que estar logueado para acceder a esta página',
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

		SIGNUP_ACCOUNT_LINK: '¿No tenés cuenta? Resgistrate acá',
		SIGN_IN_ACCOUNT_LINK: '¿Ya tenés cuenta? Entra acá',
		SIGNUP_HEADER_TEXT: 'Registrar',
		SIGNIN_HEADER_TEXT: 'Entrar',

		SIGNUP_ERROR_TEXT: 'No se pudo terminar la registración por errores',
		ENTER_ACCOUNT_EMAIL: 'Ingresá tu correo electrónico.',
		RESEND_VERIFICATION_EMAIL: 'Reenviar email de verificación',
		SAVE_CHANGES: 'Grabar cambios',
		CANCEL_BTN: 'Cancelar',

		EDIT_PROFILE: 'Editar perfil',
		UPDATE_PROFILE_BTN: 'Actualizar perfil',
		PROFILE_SAVE_SUCCESS: 'Perfil actualizado satisfactoriamente',
		PROFILE_SAVE_ERROR: 'No se pudo grabar el perfil.',
		CONNECTED_SOCIAL_ACCOUNTS: 'Redes sociales conectadas',
		CONNECT_OTHER_SOCIAL_ACCOUNTS: 'Conectar otras redes sociales',

		FORGOT_PASSWORD_LINK: '¿Olvidaste la contraseña?',
		REVERIFY_ACCOUNT_LINK: 'Reenviar email de verificación',

		SIGNIN_BTN: 'Entrar',
		SIGNUP_BTN: 'Registrarse',
		SAVE_PASSWORD_BTN: 'Grabar contraseña',

		SUCCESS_HEADER: 'Ingresaste exitosamente',
		SUCCESS_TEXT: 'Registraste exitosamente una cuenta en TellForm.',
		VERIFICATION_EMAIL_SENT: 'El email de verificación fue enviado exitosamente',
		VERIFICATION_EMAIL_SENT_TO: 'Un email de verificación fue enviado a',
		NOT_ACTIVATED_YET: 'Tu cuenta aún no está activa',
		BEFORE_YOU_CONTINUE: 'Antes de continuar asegurate de leer el email de verificación que te enviamos. Si no lo recibís en 24hs escribinos a ',
		CHECK_YOUR_EMAIL: 'Leé el email y hacé click en el link de activación para activar la cuenta. Si tenés alguna pregunta escribinos a ',
		CONTINUE: 'Continuar',

		PASSWORD_RESTORE_HEADER: 'Restaurar la contraseña',
		ENTER_YOUR_EMAIL: 'Ingresá el email de tu cuenta.',
		SUBMIT_BTN: 'Enviar',

		ASK_FOR_NEW_PASSWORD: 'Pedir reseteo de contraseña',
		PASSWORD_RESET_INVALID: 'El reseteo de la contraseña es inválido',
		PASSWORD_RESET_SUCCESS: 'Contraseña exitosamente reseteada',
		PASSWORD_CHANGE_SUCCESS: 'Contraseña exitosamente cambiada',
		RESET_PASSWORD: 'Resetear contraseña',
		CHANGE_PASSWORD: 'Cambiar contraseña',

		CONTINUE_TO_LOGIN: 'Ir a la página de ingreso',

		VERIFY_SUCCESS: 'Cuenta activada exitosamente',
		VERIFY_ERROR: 'El link de verificación es inválido o inexistente'
	});
}]);
