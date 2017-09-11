'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('Forms', ['$resource', 'FORM_URL',
	function($resource, FORM_URL) {
		return $resource(FORM_URL, {
		}, {
			'query' : {
				url: '/forms/:agency/:formId',
				method: 'GET',
				isArray: true
			},
			'get' : {
				url: '/forms/:agency/:formId',
				method: 'GET',
				transformResponse: function(data, header) {
		          	var form = angular.fromJson(data);

					form.visible_form_fields = _.filter(form.form_fields, function(field){
		            	return (field.deletePreserved === false);
		            });
		          	return form;
		        }
			},
			'update': {
				url: '/forms/:agency/:formId',
				method: 'PUT'
			},
			'save': {
				url: '/forms/:agency/:formId',
				method: 'POST'
			},
			'load': {
				url: '/forms/:agency/:formId/submitform',
				method: 'GET',
				transformResponse: function(data, header) {
		          	var form = angular.fromJson(data);

					form.visible_form_fields = _.filter(form.form_fields, function(field){
		            	return (field.deletePreserved === false);
		            });
		          	return form;
		        }
			}
		});
	}
]);
