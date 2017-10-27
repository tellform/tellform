'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('it', {
		ACCESS_DENIED_TEXT: 'Devi aver effettuato l\'accesso per accedere a questa pagina',
		USERNAME_OR_EMAIL_LABEL: 'Nome utente o posta elettronica',
		USERNAME_LABEL: 'Nome utente',
		PASSWORD_LABEL: 'Password',
		CURRENT_PASSWORD_LABEL: 'Current Password',
		NEW_PASSWORD_LABEL: 'Nuova password',
		VERIFY_PASSWORD_LABEL: 'Verifica password',
		UPDATE_PASSWORD_LABEL: 'Aggiorna password',
		FIRST_NAME_LABEL: 'Nome',
		LAST_NAME_LABEL: 'Cognome',
		LANGUAGE_LABEL: 'Lingua',
		EMAIL_LABEL: 'Email',

		SIGNUP_ACCOUNT_LINK: 'Non hai un account? Iscriviti qui ',
		SIGN_IN_ACCOUNT_LINK: 'Hai già un account? Accedi qui ',
		SIGNUP_HEADER_TEXT: 'Iscriviti',
		SIGNIN_HEADER_TEXT: 'Accedi',

		SIGNUP_ERROR_TEXT: 'Impossibile completare la registrazione a causa di errori',
		ENTER_ACCOUNT_EMAIL: "Inserisci l'email del tuo account.",
		RESEND_VERIFICATION_EMAIL: 'Ripeti l\'email di verifica',
		SAVE_CHANGES: 'Salva modifiche',
		CANCEL_BTN: 'Annulla',

		EDIT_PROFILE: 'Modifica il tuo profilo',
		UPDATE_PROFILE_BTN: 'Aggiorna profilo',
		PROFILE_SAVE_SUCCESS: 'Profilo salvato con successo',
		PROFILE_SAVE_ERROR: 'Impossibile salvare il tuo profilo.',
		CONNECTED_SOCIAL_ACCOUNTS: 'Conti sociali connessi',
		CONNECT_OTHER_SOCIAL_ACCOUNTS: 'Connetti altri account sociali',

		FORGOT_PASSWORD_LINK: 'Hai dimenticato la password?',
		REVERIFY_ACCOUNT_LINK: 'Ripeti la tua email di verifica',

		SIGNIN_BTN: 'Accedi',
		SIGNUP_BTN: 'Iscriviti',
		SAVE_PASSWORD_BTN: 'Salva password',

		SUCCESS_HEADER: 'Registra il successo',
		SUCCESS_TEXT: 'Hai registrato un account con TellForm.',
		VERIFICATION_EMAIL_SENT: 'L\'email di verifica è stata inviata',
		VERIFICATION_EMAIL_SENT_TO: 'E\' stata inviata un\'email di verifica a ',
		NOT_ACTIVATED_YET: 'Ma il tuo account non è ancora attivato',
		BEFORE_YOU_CONTINUE: 'Prima di continuare, assicurati di controllare la tua email per la nostra verifica. Se non lo ricevi entro 24 ore ci cali una linea a ',
		CHECK_YOUR_EMAIL: 'Controlla la tua email e fai clic sul link di attivazione per attivare il tuo account. Se hai domande, fai una linea a ',
		CONTINUA: 'Continua',

		PASSWORD_RESTORE_HEADER: 'Ripristina password',
		ENTER_YOUR_EMAIL: 'Inserisci l\'email del tuo account'.
		SUBMIT_BTN: 'Invia',

		ASK_FOR_NEW_PASSWORD: 'Richiedi nuova password reimpostata',
		PASSWORD_RESET_INVALID: 'Il reset della password non è valido',
		PASSWORD_RESET_SUCCESS: 'Passaporto resettato con successo',
		PASSWORD_CHANGE_SUCCESS: 'Passaporto modificato con successo',
		RESET_PASSWORD: 'Ripristina la tua password',
		CHANGE_PASSWORD: 'Modifica password',

		CONTINUE_TO_LOGIN: 'Continua alla pagina di login',

		VERIFY_SUCCESS: 'Account attivato correttamente',
		VERIFY_ERROR: 'Il collegamento di verifica non è valido o è scaduto',
		ERROR: 'Errore'
	});
}]);
