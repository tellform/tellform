'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {

		//Configure Form Tab View
		ADVANCED_SETTINGS: 'Advanced Settings',
		FORM_NAME: 'Form Name',
		FORM_STATUS: 'Status',
		FORM_COLLABORATOR: "Collaborators (comma-separated)"
		PUBLIC: 'Active',
		PRIVATE: 'Inactive',
		DISPLAY_FOOTER: 'Display Form Footer?',
		SAVE_CHANGES: 'Save',
		CANCEL: 'Cancel',
		RESET: 'Reset',
		DISPLAY_FORM_HEADER: 'Display Form Header?',
		DISPLAY_START_PAGE: 'Display Start Page?',
		DISPLAY_END_PAGE: 'Display End Page?',
		FORM_EMAIL: 'Emails (comma-separated)', // Collaborator emails, only the admin views this on the front

		//List Forms View
		CREATE_A_NEW_FORM: 'Create a new form',
		CREATE_FORM: 'Create form',
		CREATED_ON: 'Created on',
		MY_FORMS: 'My forms',
		NAME: 'Name',
		LANGUAGE: 'Language',
		FORM_INACTIVE: 'Form inactive',

		//Edit Field Modal
		EDIT_FIELD: 'Edit this Field',
		SAVE_FIELD: 'Save',
		ON: 'ON',
		OFF: 'OFF',
		REQUIRED_FIELD: 'Required',
		LOGIC_JUMP: 'Logic Jump',
		SHOW_BUTTONS: 'Additional Buttons',
		SAVE_START_PAGE: 'Save',

		//Admin Form View
		ARE_YOU_SURE: 'Are you ABSOLUTELY sure?',
		READ_WARNING: 'Unexpected bad things will happen if you don’t read this!',
		DELETE_WARNING1: 'This action CANNOT be undone. This will permanently delete the "',
		DELETE_WARNING2: '" form and remove all associated form submissions.',
		DELETE_CONFIRM: 'Please type in the name of the form to confirm.',
		I_UNDERSTAND: 'Delete this form.',
		DELETE_FORM_SM: 'Delete',
		DELETE_FORM_MD: 'Delete Form',
		DELETE: 'Delete',
		FORM: 'Form',
		VIEW: 'View',
		LIVE: 'Live',
		PREVIEW: 'Preview',
		COPY: 'Copy',
		COPY_AND_PASTE: 'Copy and Paste this to add your form to your website',
		CHANGE_WIDTH_AND_HEIGHT: 'Change the width and height values to suit you best',
		POWERED_BY: 'Powered by',
		SHARE_URL_TEXT: 'Your form is permanently at this URL',

		//Edit Form View
		DISABLED: 'Disabled',
		YES: 'YES',
		NO: 'NO',
		ADD_LOGIC_JUMP: 'Add Logic Jump',
		ADD_FIELD_LG: 'Click to Add New Field',
		ADD_FIELD_MD: 'Add New Field',
		ADD_FIELD_SM: 'Add Field',
		EDIT_START_PAGE: 'Edit Start Page',
		EDIT_END_PAGE: 'Edit End Page',
		WELCOME_SCREEN: 'Start Page',
		END_SCREEN: 'End Page',
		INTRO_TITLE: 'Title',
		INTRO_PARAGRAPH: 'Paragraph',
		INTRO_BTN: 'Start Button',
		TITLE: 'Title',
		PARAGRAPH: 'Paragraph',
		BTN_TEXT: 'Go Back Button',
		BUTTONS: 'Buttons',
		BUTTON_TEXT: 'Text',
		BUTTON_LINK: 'Link',
		ADD_BUTTON: 'Add Button',
		PREVIEW_FIELD: 'Preview Question',
		QUESTION_TITLE: 'Title',
		QUESTION_DESCRIPTION: 'Description',
		OPTIONS: 'Options',
		ADD: 'Add',
		BROWSE: 'Browse',
		ADD_OPTIONS_MANUAL: 'Manual',
		ADD_OPTIONS_FILE: 'Upload',
		SELECT_OPTION_FILE: 'Select an option file',
		NUM_OF_STEPS: 'Number of Steps',
		CLICK_FIELDS_FOOTER: 'Click on fields to add them here',
		SHAPE: 'Shape',
		IF_THIS_FIELD: 'If this field',
		IS_EQUAL_TO: 'is equal to',
		IS_NOT_EQUAL_TO: 'is not equal to',
		IS_GREATER_THAN: 'is greater than',
		IS_GREATER_OR_EQUAL_THAN: 'is greater or equal than',
		IS_SMALLER_THAN: 'is_smaller_than',
		IS_SMALLER_OR_EQUAL_THAN: 'is smaller or equal than',
		CONTAINS: 'contains',
		DOES_NOT_CONTAINS: 'does not contain',
		ENDS_WITH: 'ends with',
		DOES_NOT_END_WITH: 'does not end with',
		STARTS_WITH: 'starts with',
		DOES_NOT_START_WITH: 'does not start with',
		THEN_JUMP_TO: 'then jump to',

		//Edit Submissions View
		REFERENCE_NO: 'Reference Number',
		SUBMISSION_TIME: 'Submission Time',
		RESPONDENT_EMAIL: 'Respondent Email',

		//Design View
		BACKGROUND_COLOR: 'Background Color',
		DESIGN_HEADER: 'Change how your Form Looks',
		QUESTION_TEXT_COLOR: 'Question Text Color',
		ANSWER_TEXT_COLOR: 'Answer Text Color',
		BTN_BACKGROUND_COLOR: 'Button Background Color',
		BTN_TEXT_COLOR: 'Button Text Color',

    //Share View
    EMBED_YOUR_FORM: 'Embed HTML',
    SHARE_YOUR_FORM: 'Link',

		//Admin Tabs
		CREATE_TAB: 'Create',
		PREVIEW_TAB: 'Preview',
		CONFIGURE_TAB: 'Configure',
		RESPONSE_TAB: 'Response',
    SHARE_TAB: 'Share',

    //Field Types
    SHORT_TEXT: 'Short Text',
    EMAIL: 'Email',
    MULTIPLE_CHOICE: 'Multiple Choice',
    DROPDOWN: 'Dropdown',
    DATE: 'Date',
    PARAGRAPH_T: 'Paragraph',
    YES_NO: 'Yes/No',
    LEGAL: 'Legal',
    RATING: 'Rating',
    NUMBERS: 'Number',
    SIGNATURE: 'Signature',
    FILE_UPLOAD: 'File upload',
    OPTION_SCALE: 'Option Scale',
    PAYMENT: 'Payment',
    STATEMENT: 'Instructions',
    LINK: 'Link'
	});
}]);
