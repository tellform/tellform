'use strict';

angular.module('view-form').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('en', {
    FORM_SUCCESS: 'Form entry successfully submitted!',
	REVIEW: 'Review',
    BACK_TO_FORM: 'Go back to Form',
	EDIT_FORM: 'Edit this TellForm',
	CREATE_FORM: 'Create this TellForm',
	ADVANCEMENT: '{{done}} out of {{total}} answered',
	CONTINUE_FORM: 'Continue to Form',
	REQUIRED: 'required',
	COMPLETING_NEEDED: '{{answers_not_completed}} answer(s) need completing',
	OPTIONAL: 'optional',
	ERROR_EMAIL_INVALID: 'Please enter a valid email address',
	ERROR_NOT_A_NUMBER: 'Please enter valid numbers only',
	ERROR_URL_INVALID: 'Please a valid url',
	OK: 'OK',
	ENTER: 'press ENTER',
	YES: 'Yes',
	NO: 'No',
	NEWLINE: 'press SHIFT+ENTER to create a newline',
	CONTINUE: 'Continue',
	LEGAL_ACCEPT: 'I accept',
	LEGAL_NO_ACCEPT: 'I don’t accept',
	DELETE: 'Delete',
	CANCEL: 'Cancel',
	SUBMIT: 'Submit',
	UPLOAD_FILE: 'Upload your File',
	Y: 'Y',
	N: 'N',
	OPTION_PLACEHOLDER: 'Type or select an option',
	ADD_NEW_LINE_INSTR: 'Press SHIFT+ENTER to add a newline',
	ERROR: 'Error',

	FORM_404_HEADER: '404 - Form Does Not Exist',
	FORM_404_BODY: 'The form you are trying to access does not exist. Sorry about that!',

  	FORM_UNAUTHORIZED_HEADER: 'Not Authorized to Access Form',
  	FORM_UNAUTHORIZED_BODY1: 'The form you are trying to access is currently private and not accesible publically.',
  	FORM_UNAUTHORIZED_BODY2: 'If you are the owner of the form, you can set it to "Public" in the "Configuration" panel in the form admin.',
  });

  $translateProvider.preferredLanguage('en')
  	.fallbackLanguage('en')
	.useSanitizeValueStrategy('escape');

}]);
