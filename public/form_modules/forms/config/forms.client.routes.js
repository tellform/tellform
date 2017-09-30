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
				myForm: function (Forms, $q, $state, $stateParams) {
                    var deferred = $q.defer();
                    return Forms.get({formId: $stateParams.formId}).$promise.then(function(data) {
                        return data;
                    },  function(reason) {
                        console.error(reason);
                        $state.go('unauthorizedFormAccess');
                        return deferred.reject({redirectTo: 'unauthorizedFormAccess'});
                    });
				}
			},
			controller: 'SubmitFormController',
			controllerAs: 'ctrl'
		}).
        state('unauthorizedFormAccess', {
            url: '/forms/unauthorized',
            templateUrl: '/static/form_modules/forms/base/views/form-unauthorized.client.view.html',
	    });
    }
]);
