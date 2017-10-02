'use strict';

module.exports = {
    fieldTypes: ['textfield',
				'date',
				'email',
				'link',
				'legal',
				'url',
				'textarea',
				'statement',
				'welcome',
				'thankyou',
				'file',
				'dropdown',
				'scale',
				'rating',
				'radio',
				'checkbox',
				'hidden',
				'yes_no',
				'natural',
				'stripe',
				'number'],

    ratingShapeTypes: ['Heart',
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
						'Trash'],

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
        url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        hexCode: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        email: /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
};