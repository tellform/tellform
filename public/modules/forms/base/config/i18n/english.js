'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

  $translateProvider.translations('en', {
    FORM_SUCCESS: 'Form successfully submitted!',
	REVIEW: 'Review',
	BACK_TO_FORM: 'Back to Form',
	EDIT_FORM: 'Edit this Form',
	CREATE_FORM: 'Create this Form',
	ADVANCEMENT: '{{ done }} of {{ total }} answered',
	CONTINUE_FORM: 'Continue to Form',
	REQUIRED: 'required',
	COMPLETING_NEEDED: '{{ questions_not_completed }} mandatory question(s) to be answered',
	OPTIONAL: 'optional',
	ERROR_EMAIL_INVALID: 'Please enter a valid email',
	ERROR_URL_INVALID: 'Please enter a valid url',
	ERROR_FORM_NAME_INVALID: 'Form name can only contain alphanumeric characters, hyphens and spaces',
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
  TYPE_OR_SELECT_OPTION: 'Type or select an option',
  ABORT_UPLOAD: 'Abort ongoing upload',
  CLEAR_SELECTED_FILES: 'Clear selected files'
  });

}]);
