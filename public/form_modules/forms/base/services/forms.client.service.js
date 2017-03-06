'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('view-form').factory('Forms', ['$resource', 'VIEW_FORM_URL',
	function($resource, VIEW_FORM_URL) {
		return $resource(VIEW_FORM_URL, {
			formId: '@_id'
		}, {
			'get' : {
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
				method: 'PUT'
			},
			'save': {
				method: 'POST'
			}
		});
	}
]);
