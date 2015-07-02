'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider',
	function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('listForms', {
			url: '/forms',
			templateUrl: 'modules/forms/views/list-forms.client.view.html',
  		}).
		state('createForm', {
			url: '/forms/create',
			templateUrl: 'modules/forms/views/create-form.client.view.html',
		}).
		state('viewForm', {
			url: '/forms/:formId/admin',
			templateUrl: 'modules/forms/views/view-form.client.view.html',
		}).		
		state('viewPublicForm', {
			url: '/forms/:formId',
			templateUrl: 'modules/forms/views/view-public-form.client.view.html',
			data: {
				hideNav: true,
				hideFooter: false
			},
		}).
		state('editForm', {
			url: '/forms/:formId/edit',
			templateUrl: 'modules/forms/views/create-form.client.view.html',
		});
	}
]);