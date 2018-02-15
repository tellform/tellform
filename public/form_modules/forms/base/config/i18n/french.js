'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('fr', {
    FORM_SUCCESS: 'Votre formulaire a été enregistré!',
	REVIEW: 'Incomplet',
    BACK_TO_FORM: 'Retourner au formulaire',
	EDIT_FORM: 'Éditer le Tellform',
	CREATE_FORM: 'Créer un TellForm',
	ADVANCEMENT: '{{done}} complétés sur {{total}}',
	CONTINUE_FORM: 'Aller au formulaire',
	REQUIRED: 'obligatoire',
	COMPLETING_NEEDED: '{{answers_not_completed}} réponse(s) doive(nt) être complétée(s)',
	OPTIONAL: 'facultatif',
	ERROR_EMAIL_INVALID: 'Merci de rentrer une adresse mail valide',
	ERROR_NOT_A_NUMBER: 'Merci de ne rentrer que des nombres',
	ERROR_URL_INVALID: 'Merci de rentrer une url valide',
	OK: 'OK',
	ENTER: 'Appuyer sur ENTRÉE',
	YES: 'Oui',
	NO: 'Non',
	NEWLINE: 'Appuyer sur SHIFT+ENTER pour créer une nouvelle ligne',
	CONTINUE: 'Continuer',
	LEGAL_ACCEPT: 'J’accepte',
	LEGAL_NO_ACCEPT: 'Je n’accepte pas',
	DELETE: 'Supprimer',
	CANCEL: 'Réinitialiser',
	SUBMIT: 'Enregistrer',
	UPLOAD_FILE: 'Envoyer un fichier',
	Y: 'O',
	N: 'N',
	OPTION_PLACEHOLDER: 'Tapez ou sélectionnez une option',
	ADD_NEW_LINE_INSTR: 'Appuyez sur MAJ + ENTRÉE pour ajouter une nouvelle ligne',
	ERROR: 'Erreur',

	FORM_404_HEADER: '404 - Le formulaire n\'existe pas',
	FORM_404_BODY: 'Le formulaire auquel vous essayez d\'accéder n\'existe pas. Désolé pour ça !',

	FORM_UNAUTHORIZED_HEADER: 'Non autorisé à accéder au formulaire',
   FORM_UNAUTHORIZED_BODY1: 'Le formulaire auquel vous essayez d\'accéder est actuellement privé et inaccessible publiquement.',
   FORM_UNAUTHORIZED_BODY2: 'Si vous êtes le propriétaire du formulaire, vous pouvez le définir en "Public" dans le panneau "Configuration" du formulaire admin.',
  });

}]);
