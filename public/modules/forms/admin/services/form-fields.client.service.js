'use strict';

//TODO: DAVID: URGENT: Make this a $resource that fetches valid field types from server
angular.module('forms').service('FormFields', [ '$filter',
	function($filter) {
		this.types = [
		    {
		        name : 'textfield',
		        value : $filter('translate')('SHORT_TEXT'),
		    },
		    {
		        name : 'email',
		        value : $filter('translate')('EMAIL'),
		    },
		    {
		        name : 'radio',
		        value : $filter('translate')('MULTIPLE_CHOICE'),
		    },
		    {
		        name : 'dropdown',
		        value : $filter('translate')('DROPDOWN'),
		    },
		    {
		        name : 'date',
		        value : $filter('translate')('DATE'),
		    },
		    {
		        name : 'textarea',
		        value : $filter('translate')('PARAGRAPH'),
		    },
		    {
		        name : 'yes_no',
		        value : $filter('translate')('YES_NO'),
		    },
		    {
		        name : 'legal',
		        value : $filter('translate')('LEGAL'),
		    },
		    // {
		    //     name : 'sig',
		    //     value : $filter('translate')('SIGNATURE'),
		    // },
			// {
		    //     name : 'file',
		    //     value : $filter('translate')('FILE_UPLOAD'),
		    // },
		    {
		        name : 'rating',
		        value : $filter('translate')('RATING'),
		    },
		    {
		        name : 'link',
		        value : $filter('translate')('LINK'),
		    },
		    {
		        name : 'number',
		        value : $filter('translate')('NUMBERS'),
		    },
		    // {
		    //     name : 'scale',
		    //     value : $filter('translate')('OPINION SCALE'),
		    // },
		    // {
		    //     name : 'stripe',
		    //     value : $filter('translate')('PAYMENT'),
		    // },
		    {
		        name : 'statement',
		        value : $filter('translate')('STATEMENT')
		    }
		];
	}

]);
