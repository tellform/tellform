'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('de', {
		ACCESS_DENIED_TEXT: 'Sie müssen eingeloggt sein, um auf diese Seite zugreifen zu können',
		USERNAME_OR_EMAIL_LABEL: 'Benutzername oder E-Mail',
		USERNAME_LABEL: 'Benutzername',
		PASSWORD_LABEL: 'Passwort',
		CURRENT_PASSWORD_LABEL: 'Aktuelles Passwort',
		NEW_PASSWORD_LABEL: 'Neues Passwort',
		VERIFY_PASSWORD_LABEL: 'Passwort bestätigen',
		UPDATE_PASSWORD_LABEL: 'Passwort aktualisieren',
		FIRST_NAME_LABEL: 'Vorname',
		LAST_NAME_LABEL: 'Nachname',
		LANGUAGE_LABEL: 'Sprache',
		EMAIL_LABEL: 'Email',

		SIGNUP_ACCOUNT_LINK: 'Haben Sie kein Konto? Hier registrieren',
		SIGN_IN_ACCOUNT_LINK: 'Haben Sie bereits ein Konto? Hier anmelden',
		SIGNUP_HEADER_TEXT: 'Registrieren',
		SIGNIN_HEADER_TEXT: 'Anmelden',

		SIGNUP_ERROR_TEXT: 'Konnte die Registrierung aufgrund von Fehlern nicht abschließen',
		ENTER_ACCOUNT_EMAIL: 'Geben Sie Ihre Konto-E-Mail ein.',
		RESEND_VERIFICATION_EMAIL: 'Bestätigungs-E-Mail erneut senden',
		SAVE_CHANGES: 'Änderungen speichern',
		CANCEL_BTN: 'Abbrechen',

		EDIT_PROFILE: 'Bearbeiten Sie Ihr Profil',
		UPDATE_PROFILE_BTN: 'Profil aktualisieren',
		PROFILE_SAVE_SUCCESS: 'Profil wurde erfolgreich gespeichert',
		PROFILE_SAVE_ERROR: 'Könnte Ihr Profil nicht speichern.',
		CONNECTED_SOCIAL_ACCOUNTS: 'Verbundene Sozialkonten',
		CONNECT_OTHER_SOCIAL_ACCOUNTS: 'Andere soziale Konten verbinden',

		FORGOT_PASSWORD_LINK: 'Passwort vergessen?',
		REVERIFY_ACCOUNT_LINK: 'Bestätige deine Bestätigungs-E-Mail erneut',

		SIGNIN_BTN: "Anmelden",
		SIGNUP_BTN: 'Registrieren',
		SAVE_PASSWORD_BTN: 'Passwort speichern',

		SUCCESS_HEADER: 'Anmeldung erfolgreich',
		SUCCESS_TEXT: 'Sie haben ein Konto erfolgreich bei TellForm registriert.',
		VERIFICATION_EMAIL_SENT: 'Bestätigungs-E-Mail wurde gesendet',
		VERIFICATION_EMAIL_SENT_TO: 'Es wurde eine Bestätigungs-E-Mail gesendet.',
		NOT_ACTIVATED_YET: 'Dein Account ist noch nicht aktiviert',
		BEFORE_YOU_CONTINUE: 'Bevor Sie fortfahren, überprüfen Sie bitte Ihre E-Mail-Adresse auf Überprüfung. Wenn Sie nicht innerhalb von 24 Stunden erhalten Sie uns eine Zeile bei ',
		CHECK_YOUR_EMAIL: 'Überprüfe deine E-Mail und klicke auf den Aktivierungslink, um deinen Account zu aktivieren. Wenn Sie irgendwelche Fragen haben, lassen Sie uns eine Zeile bei ',
		WEITER: 'Weiter',

		PASSWORD_RESTORE_HEADER: 'Wiederherstellen Ihres Passworts',
		ENTER_YOUR_EMAIL: 'Geben Sie Ihre E-Mail-Adresse ein.',
		SUBMIT_BTN: 'Senden',

		ASK_FOR_NEW_PASSWORD: 'Neues Passwort zurücksetzen',
		PASSWORD_RESET_INVALID: 'Passwort-Reset ist ungültig',
		PASSWORD_RESET_SUCCESS: 'Passport erfolgreich zurückgesetzt',
		PASSWORD_CHANGE_SUCCESS: 'Pass wurde erfolgreich geändert',
		RESET_PASSWORD: 'Passwort zurücksetzen',
		CHANGE_PASSWORD: 'Ändern Sie Ihr Passwort',

		CONTINUE_TO_LOGIN: 'Weiter zur Anmeldeseite',

		VERIFY_SUCCESS: 'Konto erfolgreich aktiviert',
		VERIFY_ERROR: 'Überprüfungslink ist ungültig oder abgelaufen',
		ERROR: 'Fehler'
	});
}]);
