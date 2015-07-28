'use strict';

//Forms service used for communicating with the forms REST endpoints
angular.module('forms').factory('Forms', ['$resource',
	function($resource) {
		return $resource('forms/:formId', {
			formId: '@_id'
		}, {
			'query' : {
				method: 'GET', 
				isArray: true,
				transformResponse: function(data, header) {
		          var forms = angular.fromJson(data);
		          angular.forEach(forms, function(form, idx) {
		            form.visible_form_fields = _.filter(form.form_fields, function(field){
		            	return field.deletePreserved === false;
		            }); //<-- replace each item with an instance of the resource object
		          });
		          return forms;
		        }
			},
			'get' : {
				method: 'GET', 
				transformResponse: function(data, header) {
		          	var form = angular.fromJson(data);
		          	
		            form.visible_form_fields = _.filter(form.form_fields, function(field){
		            	return field.deletePreserved === false;
		            }); //<-- replace each item with an instance of the resource object
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