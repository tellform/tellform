'use strict';

angular.module('users').factory('Principal', ['$window', '$q', '$timeout', '$http', '$state',
  function($window, $q, $timeout, $http, $state) {

    var service = {
      _currentUser: null,

      isIdentityResolved: function() {
        if(service._currentUser === null) return false;
        return true;
      },
      isAuthenticated: function() {
        return !!service._currentUser;
      },
      isInRole: function(role) {
        if (!service.isAuthenticated() || !service._currentUser.roles) return false;

        return service._currentUser.roles.indexOf(role) !== -1;
      },
      isInAnyRole: function(roles) {
        if (!service.isAuthenticated() || !service._currentUser.roles) return false;

        for (var i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) return true;
        }

        return false;
      },
      authenticate: function(user) {
        service._currentUser = user;
         
        // store the user in $window
        if (user) $window.user = user;
        else $window.user = null;
      },
      signin: function(credentials) {

        var deferred = $q.defer();
        $http.post('/auth/signin', credentials).success(function(response) {
            console.log(response);
            // If successful we assign the response to the global user model
            service.authenticate(response);
            deferred.resolve(response);
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
      signout: function() { 
        var deferred = $q.defer();
        $http.get('/auth/signout').success(function(response) {
          // If successful we assign the response to the global user model
          deferred.resolve(null);
          service.authenticate(null);
        }).error(function(error) {
          deferred.reject(error.message || error);
        });

        return deferred.promise;
      },

      resetPassword: function(passwordDetails, token) { 
        var deferred = $q.defer();
        $http.get('/auth/password/'+token, passwordDetails).success(function(response) {

          // Attach user profile
          service.authenticate(response);

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
      identity: function() {

        // if (service.isAuthenticated()) {
        //   return service._currentUser;
        // } else if($window.user){
        //   service.authenticate($window.user);
        //   return service._currentUser;
        // }else {
        //     return $http.get('/user/me')
        //       .success(function(response) {
        //         service.authenticate(response.data.user);
        //         return response.data.user;
        //       })
        //       .error(function() {
        //         service.authenticate(null);
        //         // $state.go('signin');
        //         return null;
        //       });
        // }

        var deferred = $q.defer();

        console.log($window.user);
        console.log(service.isAuthenticated());

        // check and see if we have retrieved the user data from the server. if we have, reuse it by immediately resolving
        if (service.isAuthenticated() === true ) {
          deferred.resolve(service.currentUser);
        }else if($window.user){
          
          service.authenticate($window.user);
          deferred.resolve(service._currentUser);
        }
        // else {

        // 	// otherwise, retrieve the user data from the server, update the user object, and then resolve.
        //   $http.get('/users/me')
      		//   .success(function(response) {
      		//     service.authenticate(response);
      		//     deferred.resolve(response);
      		//   })
      		//   .error(function() {
      		//     service.authenticate(null);
      		//     deferred.reject("User's session has expired");
      		//   });
        // }

        return deferred.promise;

      }
    };

    return service;
   
  }
]);
