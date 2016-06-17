'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('en', {

		//Configure Form Tab View
		PDF_GENERATION_EMR: 'PDF Generation/EMR',
		SAVE_PDF_SUBMISSIONS: 'Save Submissions as PDFs?',
		UPLOAD_YOUR_PDF: 'Upload Your PDF Template',
		ADVANCED_SETTINGS: 'Advanced Settings',
		FORM_NAME: 'Form Name',
		FORM_STATUS: 'Form Status',
		PUBLIC: 'Public',
		PRIVATE: 'Private',
		GA_TRACKING_CODE: 'Google Analytics Tracking Code',
		DISPLAY_FOOTER: 'Display Form Footer?',
		SAVE_CHANGES: 'Save Changes',
		CANCEL: 'Cancel',

		//List Forms View
		CREATE_A_NEW_FORM: 'Create a new form',
		CREATE_FORM: 'Create form',
		CREATED_ON: 'Created on',

		//Admin Form View
		ARE_YOU_SURE: 'Are you ABSOLUTELY sure?',
		READ_WARNING: 'Unexpected bad things will happen if you don’t read this!',
		DELETE_WARNING1: 'This action CANNOT be undone.This will permanently delete the',
		DELETE_WARNING2: 'form, form submissions and remove all associated pdfs.',
		DELETE_CONFIRM: 'Please type in the name of the form to confirm',
		I_UNDERSTAND: 'I understand the consequences, delete this form',
		DELETE_FORM_SM: 'Delete',
		DELETE_FORM_MD: 'Delete Form',
		DELETE: 'Delete',
		FORM: 'Form',
		VIEW: 'View',
		LIVE: 'Live',
		PREVIEW: 'Preview',

		//Edit Form View
		ADD_FIELD_LG: 'Click to Add New Field',
		ADD_FIELD_MD: 'Add New Field',
		ADD_FIELD_SM: 'Add Field',
		PREVIEW_START_PAGE: 'Preview Start Page',
		EDIT_START_PAGE: 'Edit Start Page',
		INTRO_TTILE: 'Intro Title',
		INTRO_PARAGRAPH: 'Intro Paragraph',
		INTRO_BTN: 'Intro Button',
		BUTTONS: 'Buttons',
		BUTTON_TEXT: 'Text',
		BUTTON_LINK: 'Link',
		ADD_BUTTON: 'Add Button',
		PREVIEW_FIELD: 'Preview Field',
		EDIT_FIELD: 'Edit Field',
		QUESTION_TITLE: 'Question Title',
		QUESTION_DESCRIPTION: 'Question Description',
		OPTIONS: 'Options',
		ADD_OPTION: 'Add Option',
		NUM_OF_STEPS: 'Number of Steps',
		CLICK_FIELDS_FOOTER: 'Click on fields to add them here',

		//Edit Submissions View
		TOTAL_VIEWS: 'total unique visits',
		RESPONSES: 'responses',
		COMPLETION_RATE: 'completion rate',
		AVERAGE_TIME_TO_COMPLETE: 'avg. completion time',

		DESKTOP_AND_LAPTOP: 'Desktops',
		TABLETS: 'Tablets',
		PHONES: 'Phones',
		OTHER: 'Other',
		UNIQUE_VISITS: 'Unique Visits',

		FIELD_TITLE: 'Field Title',
		FIELD_VIEWS: 'Field Views',
		FIELD_DROPOFF: 'Field Completion',
		FIELD_RESPONSES: 'Field Responses',
		DELETE_SELECTED: 'Delete Selected',
		EXPORT_TO_EXCEL: 'Export to Excel',
		EXPORT_TO_CSV: 'Export to CSV',
		EXPORT_TO_JSON: 'Export to JSON',
		PERCENTAGE_COMPLETE: 'Percentage Complete',
		TIME_ELAPSED: 'Time Elapsed',
		DEVICE: 'Device',
		LOCATION: 'Location',
		IP_ADDRESS: 'IP Address',
		DATE_SUBMITTED: 'Date Submitted',
		GENERATED_PDF: 'Generated PDF',

		//Design View
		BACKGROUND_COLOR: 'Background Color',
		DESIGN_HEADER: 'Change how your Form Looks',
		QUESTION_TEXT_COLOR: 'Question Text Color',
		ANSWER_TEXT_COLOR: 'Answer Text Color',
		BTN_BACKGROUND_COLOR: 'Button Background Color',
		BTN_TEXT_COLOR: 'Button Text Color',

		//Admin Tabs
		CREATE_TAB: 'Create',
		DESIGN_TAB: 'Design',
		CONFIGURE_TAB: 'Configure',
		ANALYZE_TAB: 'Analyze'

	});
}]);
