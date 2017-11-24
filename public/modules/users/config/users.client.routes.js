'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {

	var checkCurrentUser = function($q, $state, User, Auth) {
	  	var deferred = $q.defer();
			
	  	if (Auth.currentUser && Auth.currentUser.email) {
	    	deferred.resolve(Auth.currentUser);
	  	} else {
	        User.getCurrent().then(
				function(user) {
				  	Auth.login();
					deferred.resolve(user);
				},
				function() {
					Auth.logout();
					deferred.reject();
					$state.go('signin', {reload: true});
				});
      	}

      	return deferred.promise;
    };

	var checkSignupDisabled = function($window, $timeout, $q) {
		var deferred = $q.defer();
		if($window.signupDisabled) {
			$timeout(deferred.reject());
		} else {
			$timeout(deferred.resolve());
		}
		return deferred.promise;
	};

	// Users state routing
	$stateProvider.
		state('profile', {
			resolve: {
          		currentUser: ['$q', '$state', 'User', 'Auth', checkCurrentUser]
        	},
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html',
			controller: 'SettingsController'
		}).
		state('password', {
			resolve: {
          		currentUser: ['$q', '$state', 'User', 'Auth', checkCurrentUser]
        	},
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html',
			controller: 'SettingsController'
		}).
		state('signup', {
			resolve: {
				isDisabled: checkSignupDisabled
			},
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signup-success', {
			resolve: {
				isDisabled: checkSignupDisabled
			},
			url: '/signup-success',
			templateUrl: 'modules/users/views/authentication/signup-success.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('access_denied', {
			url: '/access_denied',
			templateUrl: 'modules/users/views/authentication/access-denied.client.view.html'
		}).
		state('verify', {
			resolve: {
				isDisabled: checkSignupDisabled
			},
			url: '/verify/:token',
			templateUrl: 'modules/users/views/verify/verify-account.client.view.html'
		}).
		state('resendVerifyEmail', {
			resolve: {
				isDisabled: checkSignupDisabled
			},
			url: '/verify',
			templateUrl: 'modules/users/views/verify/resend-verify-email.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
