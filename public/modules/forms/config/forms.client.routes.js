'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider',

	function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('listForms', {
			url: '/forms',
			templateUrl: 'modules/forms/admin/views/list-forms.client.view.html'
  		}).state('adminPanel', {
			url: '/adminpanel',
			templateUrl: 'modules/forms/admin/views/admin-panel.client.view.html',
		}).state('submitForm', {
			url: '/forms/:agency/:formId',
			templateUrl: 'modules/forms/base/views/submit-form.client.view.html',
			data: {
				hideNav: true
			},
			resolve: {
				Forms: 'Forms',
				myForm: function (Forms, $stateParams) {
					var formToGet = Forms.get($stateParams);
					return formToGet.$promise;
				}

			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		}).state('previewForm', {
			url: '/forms/:agency/:formId/preview',
			templateUrl: 'modules/forms/base/views/submit-form.client.view.html',
			data: {
				hideNav: true
			},
			resolve: {
				Forms: 'Forms',
				myForm: function (Forms, $stateParams) {
					var formToGet = Forms.get($stateParams,
						function(form) { form.isPreview = true });
					return formToGet.$promise;
				}
			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		}).state('viewForm', {
			url: '/forms/:agency/:formId/admin',
			templateUrl: 'modules/forms/admin/views/admin-form.client.view.html',
			data: {
				permissions: [ 'editForm' ]
			},
			resolve: {
				Forms: 'Forms',
		        myForm: function (Forms, $stateParams) {
		            return Forms.get($stateParams).$promise
		        }
			},
			controller: 'AdminFormController'
		}).state('viewForm.configure', {
			url: '/configure',
			templateUrl: 'modules/forms/admin/views/adminTabs/configure.html'
	    }).state('viewForm.design', {
			url: '/design',
			templateUrl: 'modules/forms/admin/views/adminTabs/design.html'
		}).state('viewForm.response', {
			url: '/response',
			templateUrl: 'modules/forms/admin/views/adminTabs/response.html'
	    }).state('viewForm.create', {
			url: '/create',
			templateUrl: 'modules/forms/admin/views/adminTabs/create.html'
	    });
	}
]);
