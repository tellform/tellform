'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('Forms', ['$resource',
	function($resource) {
		return $resource('forms/:formId', {
			formId: '@_id'
		}, {
			'query' : {
				method: 'GET', 
				isArray: false,
				// "transformResponse": function (data) {
			 //        var _data = JSON.parse(data);
			 //        var _pdf = JSON.parse(data).pdf;

			 //        _data.pdf = _pdf;
			 //        return _data;
			 //    }
			},
			'update': {
				method: 'PUT'
			},
			'save': {
				method: 'POST'
			}
		});
	}
]);