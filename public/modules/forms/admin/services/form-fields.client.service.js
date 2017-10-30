'use strict';

//TODO: DAVID: URGENT: Make this a $resource that fetches valid field types from server
angular.module('forms').service('FormFields', [ '$rootScope', '$translate', '$window',
	function($rootScope, $translate, $window) {
		$translate.use($window.user.language);
		console.log($translate.instant('SHORT_TEXT'));

		this.types = [
		    {
		        name : 'textfield',
		        value : $translate.instant('SHORT_TEXT'),
		    },
		    {
		        name : 'email',
		        value : $translate.instant('EMAIL'),
		    },
		    {
		        name : 'radio',
		        value : $translate.instant('MULTIPLE_CHOICE'),
		    },
		    {
		        name : 'dropdown',
		        value : $translate.instant('DROPDOWN'),
		    },
		    {
		        name : 'date',
		        value : $translate.instant('DATE'),
		    },
		    {
		        name : 'textarea',
		        value : $translate.instant('PARAGRAPH'),
		    },
		    {
		        name : 'yes_no',
		        value : $translate.instant('YES_NO'),
		    },
		    {
		        name : 'legal',
		        value : $translate.instant('LEGAL'),
		    },
		    // {
		    //     name : 'sig',
		    //     value : $translate.instant('SIGNATURE'),
		    // },
			// {
		    //     name : 'file',
		    //     value : $translate.instant('FILE_UPLOAD'),
		    // },
		    {
		        name : 'rating',
		        value : $translate.instant('RATING'),
		    },
		    {
		        name : 'link',
		        value : $translate.instant('LINK'),
		    },
		    {
		        name : 'number',
		        value : $translate.instant('NUMBERS'),
		    },
		    // {
		    //     name : 'scale',
		    //     value : $translate.instant('OPINION SCALE'),
		    // },
		    // {
		    //     name : 'stripe',
		    //     value : $translate.instant('PAYMENT'),
		    // },
		    {
		        name : 'statement',
		        value : $translate.instant('STATEMENT')
		    }
		];
	}

]);
