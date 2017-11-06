'use strict';

// Setting up route
angular.module('forms').config(['$stateProvider',

	function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('listForms', {
			url: '/forms',
			templateUrl: 'modules/forms/admin/views/list-forms.client.view.html',
			resolve: {
				Forms: 'GetForms',
				myForms: function (GetForms, $q) {
		           	var deferred = $q.defer();

		           	GetForms.query(function(forms){
		            	deferred.resolve(forms);
		            });

					return deferred.promise;
		        }
			},
			controller: 'ListFormsController',
			controllerAs: 'ctrl'
  		}).state('submitForm', {
			url: '/forms/:formId',
			templateUrl: '/static/form_modules/forms/base/views/submit-form.client.view.html',
			data: {
				hideNav: true
			},
			resolve: {
				Forms: 'GetForms',
				myForm: function (GetForms, $stateParams, $q) {
		           	var deferred = $q.defer();
		           	GetForms.get({formId: $stateParams.formId}, function(resolvedForm){
		           		deferred.resolve(resolvedForm);
					});

					return deferred.promise;
		        }
			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		}).state('viewForm', {
			abstract: true,
			url: '/forms/:formId/admin',
			templateUrl: 'modules/forms/admin/views/admin-form.client.view.html',
			data: {
				permissions: [ 'editForm' ]
			},
			resolve: {
				GetForms: 'GetForms',
		        myForm: function (GetForms, $stateParams, $q) {
		            var deferred = $q.defer();
		           	GetForms.get({formId: $stateParams.formId}, function(resolvedForm){
		           		deferred.resolve(resolvedForm);
					});

					return deferred.promise;
		        },
		        formId: ['$stateParams', function ($stateParams) {
			        return $stateParams.formId;
			    }]
			},
			controller: 'AdminFormController'
		}).state('viewForm.create', {
			url: '/create',
			templateUrl: 'modules/forms/admin/views/adminTabs/create.html'
		})

		.state('viewForm.configure', {
			abstract: true,
			url: '/configure',
			templateUrl: 'modules/forms/admin/views/adminTabs/configure.html'
	    }).state('viewForm.configure.general', {
			url: '/general',
			templateUrl: 'modules/forms/admin/views/adminTabs/configureTabs/general.html'
	    }).state('viewForm.configure.self_notifications', {
			url: '/self_notifications',
			templateUrl: 'modules/forms/admin/views/adminTabs/configureTabs/self-notifications.html'
	    }).state('viewForm.configure.respondent_notifications', {
			url: '/respondent_notifications',
			templateUrl: 'modules/forms/admin/views/adminTabs/configureTabs/respondent-notifications.html'
	    })

	    .state('viewForm.design', {
			url: '/design',
			templateUrl: 'modules/forms/admin/views/adminTabs/design.html'
		}).state('viewForm.share', {
			url: '/share',
			templateUrl: 'modules/forms/admin/views/adminTabs/share.html'
	    }).state('viewForm.analyze', {
			url: '/analyze',
			templateUrl: 'modules/forms/admin/views/adminTabs/analyze.html'
	    });
	}
]);
