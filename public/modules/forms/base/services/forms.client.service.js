'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('Forms', ['$resource',
	function($resource) {
		return $resource('/forms/:agency/:formId', {
		}, {
			'query' : {
				method: 'GET',
				isArray: true
			},
			'get' : {
				method: 'GET'
			},
			'update': {
				method: 'PUT'
			},
			'save': {
				method: 'POST'
			},
			'load': {
				url: '/forms/:agency/:formId/submitform',
				method: 'GET'
			}
		});
	}
]);
