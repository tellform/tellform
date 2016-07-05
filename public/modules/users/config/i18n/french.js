'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('fr', {
		ACCESS_DENIED_TEXT: 'Vouz n’êtes pas autorisé à accéder à cette page.',
		USERNAME_LABEL: 'Nom d’utilisateur',
		PASSWORD_LABEL: 'Mot de Passe',
		CURRENT_PASSWORD_LABEL: 'Mot de passe actuel',
		NEW_PASSWORD_LABEL: 'Nouveau Mot de Passe',
		VERIFY_PASSWORD_LABEL: 'Vérifier le mot de passe',
		UPDATE_PASSWORD_LABEL: 'Mettre à jour le mot de passe',
		FIRST_NAME_LABEL: 'Prénom',
		LAST_NAME_LABEL: 'Nom',
		LANGUAGE_LABEL: 'Langue',
		EMAIL_LABEL: 'Email',

		UPDATE_PROFILE_BTN: 'Modifier le Profil',
		PROFILE_SAVE_SUCCESS: 'Profil enregistré avec succès',
		PROFILE_SAVE_ERROR: 'Erreur: impossible d’enregistrer votre Profile.',

		FORGOT_PASSWORD_LINK: 'Mot de passe oublié ?',
		REVERIFY_ACCOUNT_LINK: 'Re-envoyez un email de vérification',

		SIGNIN_BTN: 'Connexion',
		SIGNUP_BTN: 'Créer un compte',
		SAVE_PASSWORD_BTN: 'Enregistrer votre nouveau Mot de Passe',

		SUCCESS_HEADER: 'Votre Compte a été enregistré !',
		SUCCESS_TEXT: 'Votre compte Tellform a été crée avec succès.',
		VERIFICATION_EMAIL_SENT: 'Un email de verification a été envoyer à',
		NOT_ACTIVATED_YET: 'Mais votre compte n\'est pas activé',
		BEFORE_YOU_CONTINUE: 'Avant de continuer, vous devez valider votre adresse mail. Merci de vérifier votre boite mail. Si vous ne l’avez pas reçu dans les prochaines 24h, contactez-nous a ',
		CHECK_YOUR_EMAIL: 'Vérifiez vos emails, et cliquez sur le lien de validation pour activer votre compte. Si vous avez une question contactez-nous à',

		PASSWORD_RESTORE_HEADER: 'Mot de passe perdu',
		ENTER_YOUR_EMAIL: 'Entrer votre email',
		SUBMIT_BTN: 'Enregistrer',

		ASK_FOR_NEW_PASSWORD: 'Demander un nouveau mot de pass ',
		PASSWORD_RESET_INVALID: 'Le nouveau mot de passe est invalid',
		PASSWORD_RESET_SUCCESS: 'Mot de passe réinitialisé avec succès',
		PASSWORD_CHANGE_SUCCESS: 'Mot de passe enregistré avec succès',

		CONTINUE_TO_LOGIN: 'Allez à la page de connexion',

		VERIFY_SUCCESS: 'Votre compte est activé !',
		VERIFY_ERROR: 'Le lien de vérification est invalide ou à expiré'
	});

}]);
