'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider',
	
	function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('listForms', {
			url: '/forms',
			templateUrl: 'modules/forms/views/list-forms.client.view.html',
			data: {
				permissions: [ 'editForm' ]
			}
  		}).
		state('viewForm', {
			url: '/forms/:formId/admin',
			templateUrl: 'modules/forms/views/view-form.client.view.html',
			data: {
				permissions: [ 'editForm' ]
			}
		}).		
		state('viewPublicForm', {
			url: '/forms/:formId',
			templateUrl: 'modules/forms/views/view-public-form.client.view.html',
			data: {
				hideNav: true,
			},
		});
	}
]);