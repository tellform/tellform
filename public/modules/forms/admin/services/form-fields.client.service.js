'use strict';

//TODO: DAVID: URGENT: Make this a $resource that fetches valid field types from server
angular.module('forms').service('FormFields', ['$filter',
  function($filter) {
    this.types = [
      {
        name: 'textfield',
        value: $filter('translate')('SHORT_TEXT'),
      },
      {
        name: 'textarea',
        value: $filter('translate')('PARAGRAPH_TEXT'),
      },
      {
        name: 'email',
        value: $filter('translate')('EMAIL'),
      },
      {
        name: 'number',
        value: $filter('translate')('NUMBERS'),
      },
      {
        name: 'dropdown',
        value: $filter('translate')('DROPDOWN'),
      },
      {
        name: 'date',
        value: $filter('translate')('DATE'),
      },
      {
        name: 'yes_no',
        value: $filter('translate')('YES_NO'),
      },
      {
        name: 'rating',
        value: $filter('translate')('RATING'),
      },
      {
        name: 'statement',
        value: $filter('translate')('STATEMENT')
      },
      {
        name: 'section',
        value: $filter('translate')('SECTION')
      }
      // {
      //   name: 'link',
      //   value: $filter('translate')('LINK'),
      // },
      // {
      //   name: 'file',
      //   value: $filter('translate')('FILE_UPLOAD'),
      // },
      // {
      //   name: 'hidden',
      //   value: $filter('translate')('HIDDEN'),
      // },
      // {
      //   name: 'legal',
      //   value: $filter('translate')('LEGAL'),
      // },
      // {
      //   name: 'radio',
      //   value: $filter('translate')('MULTIPLE_CHOICE'),
      // }
    ];
  }

]).service('Rating', ['$filter',
  function($filter) {
    this.shapes = [
      'Heart',
			'Star'
    ];
  }
]);
