'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('Forms', ['$resource', 'FORM_URL',
	function($resource, FORM_URL) {
		return $resource(FORM_URL, {
		}, {
			'query' : {
				method: 'GET',
				isArray: true
			},
			'get' : {
				method: 'GET',
				transformResponse: function(data, header) {
		          	var form = angular.fromJson(data);
		          	console.log('step 2 - get request')
		          	console.log(FORM_URL)
		          	console.log(form)

					form.visible_form_fields = _.filter(form.form_fields, function(field){
		            	return (field.deletePreserved === false);
		            });
		          	return form;
		        }
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
