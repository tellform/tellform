'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('de', {
	FORM_SUCCESS: 'Ihre Angaben wurden gespeichert.',
	REVIEW: 'Unvollständig',
	BACK_TO_FORM: 'Zurück zum Formular',
	EDIT_FORM: 'Bearbeiten Sie diese TellForm',
	CREATE_FORM: 'Dieses TellForm erstellen',
	ADVANCEMENT: '{{done}} von {{total}} beantwortet',
	CONTINUE_FORM: 'Zum Formular',
	REQUIRED: 'verpflichtend',
	COMPLETING_NEEDED: 'Es fehlen/fehtl noch {{answers_not_completed}} Antwort(en)',
	OPTIONAL: 'fakultativ',
	ERROR_EMAIL_INVALID: 'Bitte gültige Mailadresse eingeben',
	ERROR_NOT_A_NUMBER: 'Bitte nur Zahlen eingeben',
	ERROR_URL_INVALID: 'Bitte eine gültige URL eingeben',
	OK: 'Okay',
	ENTER: 'Eingabetaste drücken',
	YES: 'Ja',
	NO: 'Nein',
	NEWLINE: 'Für eine neue Zeile SHIFT+ENTER drücken',
	CONTINUE: 'Weiter',
	LEGAL_ACCEPT: 'I accept',
	LEGAL_NO_ACCEPT: 'I don’t accept',
	DELETE: 'Entfernen',
	CANCEL: 'Canceln',
	SUBMIT: 'Speichern',
	UPLOAD_FILE: 'Datei versenden',
	Y: 'J',
	N: 'N',
	OPTION_PLACEHOLDER: 'Geben oder wählen Sie eine Option aus',
	ADD_NEW_LINE_INSTR: 'Drücken Sie UMSCHALT + EINGABETASTE, um eine neue Zeile hinzuzufügen',
  	ERROR: 'Fehler',
  	
  	FORM_404_HEADER: '404 - Formular existiert nicht',
  	FORM_404_BODY: 'Das Formular, auf das Sie zugreifen möchten, existiert nicht. Das tut mir leid!',
  	
  	FORM_UNAUTHORIZED_HEADER: 'Nicht zum Zugriffsformular berechtigt\' ',
   FORM_UNAUTHORIZED_BODY1: 'Das Formular, auf das Sie zugreifen möchten, ist derzeit privat und nicht öffentlich zugänglich.',
   FORM_UNAUTHORIZED_BODY2: 'Wenn Sie der Eigentümer des Formulars sind, können Sie es im Fenster "Konfiguration" im Formular admin auf "Öffentlich" setzen.',
  });

}]);
