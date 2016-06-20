'use strict';

// Setting up route
angular.module('view-form').config(['$stateProvider',

	function($stateProvider) {
		// Forms state routing
		$stateProvider.
		state('submitForm', {
			url: '/forms/:formId',
			templateUrl: '/static/form_modules/forms/base/views/submit-form.client.view.html',
			resolve: {
				Forms: 'Forms',
				myForm: function (Forms, $stateParams) {
					return Forms.get({formId: $stateParams.formId}).$promise;
				}
			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		})
	}
]);
