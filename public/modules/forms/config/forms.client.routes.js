'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider',

	function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('listForms', {
			url: '/forms',
			templateUrl: 'modules/forms/admin/views/list-forms.client.view.html'
  		}).state('submitForm', {
			url: '/forms/:agency/:formId',
			templateUrl: 'modules/forms/base/views/submit-form.client.view.html',
			data: {
				hideNav: true
			},
			resolve: {
				Forms: 'Forms',
				myForm: function (Forms, $stateParams) {
					var formToGet = Forms.get({formId: $stateParams.formId});
					return formToGet.$promise;
				}
			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		}).state('previewForm', {
			url: '/forms/:formId/preview',
			templateUrl: 'modules/forms/base/views/submit-form.client.view.html',
			data: {
				hideNav: true
			},
			resolve: {
				Forms: 'Forms',
				myForm: function (Forms, $stateParams) {
					var formToGet = Forms.get({formId: $stateParams.formId}, 
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
		        	console.log('step 1 - view forms')
		        	console.log($stateParams)
		            // return Forms.get({formId: $stateParams.formId}).$promise;
		            return Forms.get($stateParams).$promise
		            // return Forms.get({formId: "123"}).$promise;
		            // formidx
		        }
			},
			controller: 'AdminFormController'
		}).state('viewForm.configure', {
			url: '/configure',
			templateUrl: 'modules/forms/admin/views/adminTabs/configure.html'
	    }).state('viewForm.design', {
			url: '/design',
			templateUrl: 'modules/forms/admin/views/adminTabs/design.html'
	    }).state('viewForm.analyze', {
			url: '/analyze',
			templateUrl: 'modules/forms/admin/views/adminTabs/analyze.html'
	    }).state('viewForm.create', {
			url: '/create',
			templateUrl: 'modules/forms/admin/views/adminTabs/create.html'
	    });
	}
]);
