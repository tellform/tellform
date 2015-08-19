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
        $http.post('/auth/signin', credentials).success(function(response) {
            deferred.resolve(response);
          }).error(function(error) {
            deferred.reject(error.message || error);
          });
          return deferred.promise;
      },
      logout: function() { 
        var deferred = $q.defer();
        $http.get('/auth/signout').success(function(response) {
          deferred.resolve(null);
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },
      signup: function(credentials) { 

        var deferred = $q.defer();

        $http.post('/auth/signup', credentials).success(function(response) {
          // If successful we assign the response to the global user model
          deferred.resolve(response);
        }).error(function(error) {

          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

      resendVerifyEmail: function(_email) { 
        var deferred = $q.defer();
        $http.post('/auth/verify/', {email: _email}).success(function(response) {
          deferred.resolve(response);
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

      validateVerifyToken: function(token) { 
        var deferred = $q.defer();
        $http.get('/auth/verify/'+token).success(function(response) {
          deferred.resolve(response);
        }).error(function(error) {
          deferred.reject(error);
        });

        return deferred.promise;
      },

      resetPassword: function(passwordDetails, token) { 
        var deferred = $q.defer();
        $http.get('/auth/password/'+token, passwordDetails).success(function(response) {
          deferred.resolve();
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

      // Submit forgotten password account id
      askForPasswordReset: function(credentials) {
        var deferred = $q.defer();
        $http.post('/auth/forgot', credentials).success(function(response) {
          // Show user success message and clear form

          deferred.resolve(response);

        }).error(function(error) {
          // Show user error message
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

    };

    return userService;
   
  }
]);
