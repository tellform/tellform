'use strict';

// Setting up route
angular.module('users').config([
	'$stateProvider', '$templateCache',
	function($stateProvider, $templateCache) {

	var checkLoggedin = function($q, $timeout, $state, User, Auth) {
      var deferred = $q.defer();

      // console.log(Auth.ensureHasCurrentUser(User));

      if (Auth.currentUser && Auth.currentUser.email) {
        $timeout(deferred.resolve);
      }
      else {
        Auth.currentUser = User.getCurrent(function() {
          Auth.login();
          $timeout(deferred.resolve());
        },
        function() {
          Auth.logout();
          $timeout(deferred.reject());
          $state.go('sigin', {reload: true});
        });
      }

      return deferred.promise;
    };

	// Users state routing
	$stateProvider.
		state('profile', {
			resolve: {
          		loggedin: checkLoggedin
        	},
			url: '/settings/profile',
			template: $templateCache.get('modules/users/views/settings/edit-profile.client.view.html')
		}).
		state('password', {
			resolve: {
	          	loggedin: checkLoggedin
	        },
			url: '/settings/password',
			template: $templateCache.get('modules/users/views/settings/change-password.client.view.html')
		}).
		state('accounts', {
			resolve: {
	          	loggedin: checkLoggedin
	        },
			url: '/settings/accounts',
			template: $templateCache.get('modules/users/views/settings/social-accounts.client.view.html')
		}).

		state('signup', {
			url: '/signup',
			template: $templateCache.get('modules/users/views/authentication/signup.client.view.html')
		}).
		state('signup-success', {
			url: '/signup-success',
			template: $templateCache.get('modules/users/views/authentication/signup-success.client.view.html')
		}).
		state('signin', {
			url: '/signin',
			template: $templateCache.get('modules/users/views/authentication/signin.client.view.html')
		}).
		state('access_denied', {
			url: '/access_denied',
			template: $templateCache.get('modules/users/views/authentication/access-denied.client.view.html')
		}).

		state('resendVerifyEmail', {
			url: '/verify',
			template: $templateCache.get('modules/users/views/verify/resend-verify-email.client.view.html')
		}).
		state('verify', {
			url: '/verify/:token',
			template: $templateCache.get('modules/users/views/verify/verify-account.client.view.html')
		}).

		state('forgot', {
			url: '/password/forgot',
			template: $templateCache.get('modules/users/views/password/forgot-password.client.view.html')
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			template: $templateCache.get('modules/users/views/password/reset-password-invalid.client.view.html')
		}).
		state('reset-success', {
			url: '/password/reset/success',
			template: $templateCache.get('modules/users/views/password/reset-password-success.client.view.html')
		}).
		state('reset', {
			url: '/password/reset/:token',
			template: $templateCache.get('modules/users/views/password/reset-password.client.view.html')
		});
	}
]);
