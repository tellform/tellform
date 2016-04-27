'use strict';

// Setting up route
angular.module('forms').config([
	'$stateProvider', '$templateCache',

	function($stateProvider, $templateCache) {
		// Forms state routing
		$stateProvider.
		state('listForms', {
			url: '/forms',
			template: $templateCache.get('modules/forms/views/list-forms.client.view.html')
  		}).
  		state('submitForm', {
			url: '/forms/:formId',
			template: $templateCache.get('modules/forms/views/submit-form.client.view.html'),
			data: {
				hideNav: true,
			},
			resolve: {
				Forms: 'Forms',
		        myForm: function (Forms, $stateParams) {
		            return Forms.get({formId: $stateParams.formId}).$promise;
		        },
			},
			controller: 'SubmitFormController',
            controllerAs: 'ctrl'
		}).state('viewForm', {
			url: '/forms/:formId/admin',
			template: $templateCache.get('modules/forms/views/admin-form.client.view.html'),
			data: {
				permissions: [ 'editForm' ]
			},
			resolve: {
				Forms: 'Forms',
		        myForm: function (Forms, $stateParams) {
		            return Forms.get({formId: $stateParams.formId}).$promise;
		        },
			},
			controller: 'AdminFormController'
		}).state('viewForm.configure', {
			url: '/configure',
			template: $templateCache.get('modules/forms/views/adminTabs/configure.html')
	    }).state('viewForm.design', {
			url: '/design',
			template: $templateCache.get('modules/forms/views/adminTabs/design.html')
	    }).state('viewForm.analyze', {
			url: '/analyze',
			template: $templateCache.get('modules/forms/views/adminTabs/analyze.html')
	    }).state('viewForm.create', {
			url: '/create',
			template: $templateCache.get('modules/forms/views/adminTabs/create.html')
	    });
	}
]);
