'use strict';

var constants = module.exports = {

	extraneousFormFieldProps: [	
		'validFieldTypes',
		'disabled',
		'required',
		'isSubmission',
		'title',
		'fieldOptions',
		'ratingOptions',
		'logicJump',
		'description',
		'created',
		'lastModified',
		'deletePreserved'
	],

    fieldTypes: [
    	'textfield',
		'date',
		'email',
		'legal',
		'textarea',
		'link',
		'statement',
		'dropdown',
		'rating',
		'radio',
		'hidden',
		'yes_no',
		'number'
	],

    ratingShapeTypes: [
		'Heart',
		'Star',
		'thumbs-up',
		'thumbs-down',
		'Circle',
		'Square',
		'Check Circle',
		'Smile Outlined',
		'Hourglass',
		'bell',
		'Paper Plane',
		'Comment',
		'Trash'
	],
	
    deviceTypes: ['desktop', 'phone', 'tablet', 'other'],
    languageTypes: ['en', 'fr', 'es', 'it', 'de'],

    langCodeToWord: {
		'en': 'English',
		'fr': 'Français',
		'es': 'Español',
		'it': 'Italiàno',
		'de': 'Deutsch'
	},

    wordToLangCode: {
		'English': 'en',
		'Français': 'fr',
		'Español': 'es',
		'Italiàno': 'it',
		'Deutsch': 'de'
	},

	privateFields: {
		'public_form': ['__v', 'analytics.visitors', 'analytics.views', 'analytics.conversionRate', 'analytics.fields', 'lastModified', 'created'],
		'private_form': ['__v'],
		'public_user': ['passwordHash', 'password', 'provider', 'salt', 'lastModified', 'created', 'resetPasswordToken', 'resetPasswordExpires', 'token', 'apiKey', '__v'],
		'private_user': ['passwordHash', 'password', 'provider', 'salt', 'resetPasswordToken', 'resetPasswordExpires', 'token', '__v']
	},

    expressionStringTypes: 	['field == static',
			'field != static',
			'field > static',
			'field >= static',
			'field <= static',
			'field < static',
			'field contains static',
			'field !contains static',
			'field begins static',
			'field !begins static',
			'field ends static',
			'field !ends static'],

    userRoleTypes: ['user', 'admin', 'superuser'],

    regex: {
    	username: /^[a-zA-Z0-9\-]+$/,
        url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        hexCode: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        email: /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
};