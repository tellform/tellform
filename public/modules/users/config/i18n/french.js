'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {
		ACCESS_DENIED_TEXT: 'Vouz est pas autorisé pour accese cete page.',
		USERNAME_LABEL: 'Nom de Compte',
		PASSWORD_LABEL: 'Mot de Pass',
		CURRENT_PASSWORD_LABEL: 'Current Password',
		NEW_PASSWORD_LABEL: 'Nouveau Mot de Pass Password',
		VERIFY_PASSWORD_LABEL: 'Verify Password',
		UPDATE_PASSWORD_LABEL: 'Update Password',
		FIRST_NAME_LABEL: 'Premiere Nom Name',
		LAST_NAME_LABEL: 'Surnom',
		LANGUAGE_LABEL: 'Language',
		EMAIL_LABEL: 'Email',

		UPDATE_PROFILE_BTN: 'Modifier Profile',
		PROFILE_SAVE_SUCCESS: 'Profile saved successfully',
		PROFILE_SAVE_ERROR: 'Erreur: On peux pas enregistré votre Profile.',

		FORGOT_PASSWORD_LINK: 'Oublier votre mot de pass?',
		REVERIFY_ACCOUNT_LINK: 'Re-envoyez ton email de verification',

		SIGNIN_BTN: 'Connexion',
		SIGNUP_BTN: 'Créer un compte',
		SAVE_PASSWORD_BTN: 'Enregistreé ton nouveau Mot de Pass',

		SUCCESS_HEADER: 'Votre Compte a été enregistré!',
		SUCCESS_TEXT: 'Vouz a enregistré un compte a TellForm.',
		VERIFICATION_EMAIL_SENT: 'Un email de verification a été envoyer a',
		NOT_ACTIVATED_YET: 'Mais votre compte n\'est pas activé',
		BEFORE_YOU_CONTINUE: 'Plutôt que vouz continué, vouz devrez voire ton inbox pour notre message de verification. Si tu receivoir-pas un message de verification dan le prochaine 24h, contactez nous a ',
		CHECK_YOUR_EMAIL: 'Check your email and click on the activation link to activate your account. If you have any questions drop us a line at',

		PASSWORD_RESTORE_HEADER: 'Restore your password',
		ENTER_YOUR_EMAIL: 'Entrer votre email de compte',
		SUBMIT_BTN: 'Enregistrer',

		ASK_FOR_NEW_PASSWORD: 'Demander un nouveau mot de pass ',
		PASSWORD_RESET_INVALID: 'Password reset is invalid',
		PASSWORD_RESET_SUCCESS: 'Passport successfully reset',
		PASSWORD_CHANGE_SUCCESS: 'Passport successfully changed',

		CONTINUE_TO_LOGIN: 'Allez au page de connexion',

		VERIFY_SUCCESS: 'Compte est activé!',
		VERIFY_ERROR: 'Le fléche de verification est invalid ou expireé'
	});

}]);
