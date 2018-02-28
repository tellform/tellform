'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('sv', {
		ACCESS_DENIED_TEXT: 'Du behöver vara inloggad för att kunna besöka denna sida',
		USERNAME_OR_EMAIL_LABEL: 'Användarnamn eller E-post',
		USERNAME_LABEL: 'Användarnamn',
		PASSWORD_LABEL: 'Lösenord',
		CURRENT_PASSWORD_LABEL: 'Nuvarande Lösenord',
		NEW_PASSWORD_LABEL: 'Nytt Lösenord',
		VERIFY_PASSWORD_LABEL: 'Bekräfta Lösenord',
		UPDATE_PASSWORD_LABEL: 'Uppdatera Lösenord',
		FIRST_NAME_LABEL: 'Förnamn',
		LAST_NAME_LABEL: 'Efternamn',
		LANGUAGE_LABEL: 'Språk',
		EMAIL_LABEL: 'E-post',

		SIGNUP_ACCOUNT_LINK: 'Har du inte redan ett konto? Registrera dig här',
		SIGN_IN_ACCOUNT_LINK: 'Har du redan ett konto? Logga in här',
		SIGNUP_HEADER_TEXT: 'Registrera',
		SIGNIN_HEADER_TEXT: 'Logga in',

		SIGNUP_ERROR_TEXT: 'Kunde inte slutföra registrering på grund av fel',
		ENTER_ACCOUNT_EMAIL: 'Ange e-postadress för ditt konto.',
		RESEND_VERIFICATION_EMAIL: 'Skicka om E-post för Verifiering',
		SAVE_CHANGES: 'Spara Ändringar',
		CANCEL_BTN: 'Avbryt',

		EDIT_PROFILE: 'Redigera din profil',
		UPDATE_PROFILE_BTN: 'Uppdatera Profil',
		PROFILE_SAVE_SUCCESS: 'Profil sparades framgångsrikt',
		PROFILE_SAVE_ERROR: 'Kunde Inte Spara Din Profil.',
		CONNECTED_SOCIAL_ACCOUNTS: 'Kopplade sociala konton',
		CONNECT_OTHER_SOCIAL_ACCOUNTS: 'Koppla andra sociala konton',

		FORGOT_PASSWORD_LINK: 'Glömt ditt lösenord?',
		REVERIFY_ACCOUNT_LINK: 'Skicka om e-postmeddelande för verifiering',

		SIGNIN_BTN: 'Logga in',
		SIGNUP_BTN: 'Registrera',
		SAVE_PASSWORD_BTN: 'Spara Lösenord',

		SUCCESS_HEADER: 'Registrering Framgånsrik',
		SUCCESS_TEXT: 'Du har framgångsrikt registrerat ett konto på TellForm.',
		VERIFICATION_EMAIL_SENT: 'Ett Verifieringsmeddelande har blivit Skickat',
		VERIFICATION_EMAIL_SENT_TO: 'Ett verifieringsmeddelande har blivit skickat till',
		NOT_ACTIVATED_YET: 'Men ditt konto är ännu inte aktiverat',
		BEFORE_YOU_CONTINUE: 'Innan du fortsätter, försäkra dig om att kolla din e-post för vår verifiering. Om du inte tar emot den inom 24 timmar så skicka oss ett meddelande på ',
		CHECK_YOUR_EMAIL: 'Kolla din e-post och klicka på aktiveringslänken för att aktivera ditt konto. Om du har några frågor så skicka oss ett meddelande på ',
		CONTINUE: 'Fortsätt',

		PASSWORD_RESTORE_HEADER: 'Återställ ditt lösenord',
		ENTER_YOUR_EMAIL: 'Ange e-postadressen till ditt konto.',
		SUBMIT_BTN: 'Skicka',

		ASK_FOR_NEW_PASSWORD: 'Fråga efter ny lösenordsåterställning',
		PASSWORD_RESET_INVALID: 'Länken till återställning av lösenord är ogiltig',
		PASSWORD_RESET_SUCCESS: 'Lösenordet återställdes framgångsrikt',
		PASSWORD_CHANGE_SUCCESS: 'Lösenordet ändrades framgångsrikt',
		RESET_PASSWORD: 'Återställ ditt lösenord',
		CHANGE_PASSWORD: 'Ändra ditt lösenord',

		CONTINUE_TO_LOGIN: 'Fortsätt till logga in-sidan',

		VERIFY_SUCCESS: 'Kontot framgångsrikt aktiverat',
		VERIFY_ERROR: 'Verifieringslänken är ogiltig eller har utgått',
		ERROR: 'Fel'
	});
  
}]);
