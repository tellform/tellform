'use strict';

angular.module('users').factory('Auth', ['$window', '$q',
  function($window, $q) {

    var userState = {
      isLoggedIn: false
    };

    var service = {
      _currentUser: null,
      get currentUser(){
        return this._currentUser;
      },

      // Note: we can't make the User a dependency of Auth
      // because that would create a circular dependency
      // Auth <- $http <- $resource <- LoopBackResource <- User <- Auth
      ensureHasCurrentUser: function(User) {
        var deferred = $q.defer();

        if (service._currentUser && service._currentUser.username) {
          deferred.resolve(service._currentUser);
        } else if ($window.user){
          service._currentUser = $window.user;
          deferred.resolve(service._currentUser)
        } else {
          User.getCurrent().then(function(user) {
            // success
            service._currentUser = user;
            userState.isLoggedIn = true;
            $window.user = service._currentUser;
            deferred.resolve(service._currentUser);
          },
          function(response) {
            userState.isLoggedIn = false;
            service._currentUser = null;
            $window.user = null;
            deferred.reject('User data could not be fetched from server');
          });
        }

        return deferred.promise;
      },

      isAuthenticated: function() {
        return !!service._currentUser;
      },

      getUserState: function() {
        return userState;
      },

      login: function(new_user) {
        userState.isLoggedIn = true;
        service._currentUser = new_user;
      },

      logout: function() {
        $window.user = null;
        userState.isLoggedIn = false;
        service._currentUser = null;
      }
    };
    return service;

  }
]);
