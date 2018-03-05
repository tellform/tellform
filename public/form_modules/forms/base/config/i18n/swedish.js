+'use strict';
+
+angular.module('view-form').config(['$translateProvider', function ($translateProvider) {
+
+  $translateProvider.translations('en', {
+    FORM_SUCCESS: 'Formulärsvaret skickades framgångsrikt in!',
+	REVIEW: 'Granska',
+    BACK_TO_FORM: 'Gå tillbaka till Formuläret',
+	EDIT_FORM: 'Ändra denna TellForm',
+	CREATE_FORM: 'Skapa denna TellForm',
+	ADVANCEMENT: '{{done}} utav {{total}} svar',
+	CONTINUE_FORM: 'Fortsätt till Form',
+	REQUIRED: 'krävs',
+	COMPLETING_NEEDED: '{{answers_not_completed}} svar behöver färdigställas',
+	OPTIONAL: 'valfri',
+	ERROR_EMAIL_INVALID: 'Vänligen ange en giltig e-postadress',
+	ERROR_NOT_A_NUMBER: 'Vänligen ange endast giltiga nummer',
+	ERROR_URL_INVALID: 'Vänligen en giltig url',
+	OK: 'OK',
+	ENTER: 'tryck ENTER',
+	YES: 'Ja',
+	NO: 'Nej',
+	NEWLINE: 'tryck SHIFT+ENTER för att skapa ny rad',
+	CONTINUE: 'Fortsätt',
+	LEGAL_ACCEPT: 'Jag accepterar',
+	LEGAL_NO_ACCEPT: 'Jag accepterar inte',
+	DELETE: 'Radera',
+	CANCEL: 'Avbryt',
+	SUBMIT: 'Skicka',
+	UPLOAD_FILE: 'Ladda upp din Fil',
+	Y: 'J',
+	N: 'N',
+	OPTION_PLACEHOLDER: 'Skriv eller välj ett alternativ',
+	ADD_NEW_LINE_INSTR: 'Tryck SHIFT+ENTER för att lägga till ny rad',
+	ERROR: 'Fel',
+
+	FORM_404_HEADER: '404 - Formulär Existerar Inte',
+	FORM_404_BODY: 'Formuläret du försöker besöka till existerar inte. Ursäkta för det!',
+
+  	FORM_UNAUTHORIZED_HEADER: 'Inte Auktoriserad att Tillgå Formulär',
+  	FORM_UNAUTHORIZED_BODY1: 'Formuläret du försöker att besöka är för närvarande privat och inte tillgänglig offentligt.',
+  	FORM_UNAUTHORIZED_BODY2: 'Om du är ägaren till formuläret kan du ställa in den till "Offentlig" i panelen "Konfiguration" i formulärets administration.',
+  });
+
+}]);
