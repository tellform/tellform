'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('it', {
	FORM_SUCCESS: 'Il formulario è stato inviato con successo!',
	REVIEW: 'Incompleto',
	BACK_TO_FORM: 'Ritorna al formulario',
	EDIT_FORM: 'Modifica questo TellForm',
	CREATE_FORM: 'Crea questo TellForm',
	ADVANCEMENT: '{{done}} su {{total}} completate',
	CONTINUE_FORM: 'Vai al formulario',
	REQUIRED: 'obbligatorio',
	COMPLETING_NEEDED: '{{answers_not_completed}} risposta/e deve/ono essere completata/e',
	OPTIONAL: 'opzionale',
	ERROR_EMAIL_INVALID: 'Si prega di inserire un indirizzo email valido',
	ERROR_NOT_A_NUMBER: 'Si prega di inserire solo numeri',
	ERROR_URL_INVALID: 'Grazie per inserire un URL valido',
	OK: 'OK',
	ENTER: 'premere INVIO',
	YES: 'Sì',
	NO: 'No',
	NEWLINE: 'premere SHIFT+INVIO per creare una nuova linea',
	CONTINUE: 'Continua',
	LEGAL_ACCEPT: 'I accept',
	LEGAL_NO_ACCEPT: 'I don’t accept',
	DELETE: 'Cancella',
	CANCEL: 'Reset',
	SUBMIT: 'Registra',
	UPLOAD_FILE: 'Invia un file',
	Y: 'S',
	N: 'N',
	OPTION_PLACEHOLDER: 'Digitare o selezionare un\'opzione',
	ADD_NEW_LINE_INSTR: 'Premere SHIFT + INVIO per aggiungere una nuova riga',
  	ERROR: 'Errore',
  	
  	FORM_404_HEADER: '404 - Il modulo non esiste',
  	FORM_404_BODY: 'La forma che stai cercando di accedere non esiste. Ci dispiace!',
  
  	FORM_UNAUTHORIZED_HEADER: 'Non autorizzato per accedere al modulo',
   	FORM_UNAUTHORIZED_BODY1: 'Il modulo che si sta tentando di accedere è attualmente privato e non accessibile in pubblico.',
   	FORM_UNAUTHORIZED_BODY2: 'Se sei il proprietario del modulo, puoi impostarlo su "Pubblico" nel pannello "Configurazione" nell\'amministratore di moduli.',
  });

}]);
