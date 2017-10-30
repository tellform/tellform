'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

	  $translateProvider.translations('es', {
		FORM_SUCCESS: '¡El formulario ha sido enviado con éxito!',
		REVIEW: 'Revisar',
		BACK_TO_FORM: 'Regresar al formulario',
		EDIT_FORM: 'Editar este TellForm',
		CREATE_FORM: 'Crear este TellForm',
		ADVANCEMENT: '{{done}} de {{total}} contestadas',
		CONTINUE_FORM: 'Continuar al formulario',
		REQUIRED: 'Información requerida',
		COMPLETING_NEEDED: '{{answers_not_completed}} respuesta(s) necesita(n) ser completada(s)',
		OPTIONAL: 'Opcional',
		ERROR_EMAIL_INVALID: 'Favor de proporcionar un correo electrónico válido',
		ERROR_NOT_A_NUMBER: 'Por favor, introduzca sólo números válidos',
		ERROR_URL_INVALID: 'Favor de proporcionar un url válido',
		OK: 'OK',
		ENTER: 'pulse INTRO',
		YES: 'Si',
		NO: 'No',
		NEWLINE: 'presione SHIFT+INTRO para crear una nueva línea',
		CONTINUE: 'Continuar',
		LEGAL_ACCEPT: 'Yo acepto',
		LEGAL_NO_ACCEPT: 'Yo no acepto',
		DELETE: 'Eliminar',
		CANCEL: 'Cancelar',
		SUBMIT: 'Registrar',
		UPLOAD_FILE: 'Cargar el archivo',
		Y: 'S',
		N: 'N',
		OPTION_PLACEHOLDER: 'Escriba o seleccione una opción',
		ADD_NEW_LINE_INSTR: 'Presione MAYÚS + ENTRAR para agregar una nueva línea',
	  	ERROR: 'Error',
	  	
	  	FORM_404_HEADER: '404 - La forma no existe',
	  	FORM_404_BODY: 'El formulario al que intenta acceder no existe. ¡Lo siento por eso!',
	  	
	  	FORM_UNAUTHORIZED_HEADER: 'Non autorizzato per accedere al modulo',
   		FORM_UNAUTHORIZED_BODY1: 'Il modulo che si sta tentando di accedere è attualmente privato e non accessibile in pubblico.',
   		FORM_UNAUTHORIZED_BODY2: 'Se sei il proprietario del modulo, puoi impostarlo su "Pubblico" nel pannello "Configurazione" nell\'amministratore di moduli.',
	});

}]);
