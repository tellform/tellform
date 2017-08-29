'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('Forms', ['$resource', 'FORM_URL',
	function($resource, FORM_URL) {
		return $resource(FORM_URL, {
			formId: '@_id'
		}, {
			'query' : {
				method: 'GET',
				isArray: true,
				transformResponse: function (data) {
					
					var forms = angular.fromJson(data);
					
					function compareStrings(a, b) {
					  // Assuming you want case-insensitive comparison
					  a = a.toLowerCase();
					  b = b.toLowerCase();
					  return (a < b) ? -1 : (a > b) ? 1 : 0;
					}

					forms.sort(function(a, b) {
					  return compareStrings(a.title, b.title);
					})

					return forms
				}
			},
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
