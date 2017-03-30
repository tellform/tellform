'use strict';

angular.module('users').factory('User', ['$window', '$q', '$timeout', '$http', '$state',
  function($window, $q, $timeout, $http, $state) {

    var userService = {
      getCurrent: function() {
      	var deferred = $q.defer();

      	$http.get('/users/me')
    		  .success(function(response) {
    		    deferred.resolve(response);
    		  })
    		  .error(function() {
    		    deferred.reject('User\'s session has expired');
    		  });

        return deferred.promise;
      },
      login: function(credentials) {

        var deferred = $q.defer();
        $http.post('/auth/signin', credentials).then(function(response) {
            deferred.resolve(response.data);
          }, function(error) {
            deferred.reject(error.data.message || error.data);
          });

        return deferred.promise;
      },
      logout: function() {

        var deferred = $q.defer();
        $http.get('/auth/signout').then(function(response) {
          deferred.resolve(null);
        }, function(error) {
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      },
      signup: function(credentials) {

        var deferred = $q.defer();
        $http.post('/auth/signup', credentials).then(function(response) {
          // If successful we assign the response to the global user model
          deferred.resolve(response.data);
        }, function(error) {
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      },

      resendVerifyEmail: function(_email) {

        var deferred = $q.defer();
        $http.post('/auth/verify', {email: _email}).then(function(response) {
          deferred.resolve(response.data);
        }, function(error) {
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      },

      validateVerifyToken: function(token) {

        //DAVID: TODO: The valid length of a token should somehow be linked to server config values
        //DAVID: TODO: SEMI-URGENT: Should we even be doing this?
        var validTokenRe = /^([A-Za-z0-9]{48})$/g;
        if( !validTokenRe.test(token) ) throw new Error('Error token: '+token+' is not a valid verification token');

        var deferred = $q.defer();
        $http.get('/auth/verify/'+token).then(function(response) {
          deferred.resolve(response.data);
        }, function(error) {
          deferred.reject(error.data);
        });

        return deferred.promise;
      },

      resetPassword: function(passwordDetails, token) {

        var deferred = $q.defer();
        $http.post('/auth/reset/'+token, passwordDetails).then(function(response) {
          deferred.resolve(response);
        }, function(error) {
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      },

      // Submit forgotten password account id
      askForPasswordReset: function(credentials) {

        var deferred = $q.defer();
        $http.post('/auth/forgot', credentials).then(function(response) {
          // Show user success message and clear form
          deferred.resolve(response.data);
        }, function(error) {
          // Show user error message
          deferred.reject(error.data.message || error.data);
        });

        return deferred.promise;
      }

    };

    return userService;

  }
]);
