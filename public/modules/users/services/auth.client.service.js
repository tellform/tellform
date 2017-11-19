'use strict';

angular.module('users').factory('Auth', ['$window', '$q', 'User',
  function($window, $q, User) {

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
      ensureHasCurrentUser: function() {
        var deferred = $q.defer();

        if (this._currentUser && this._currentUser.username) {
          deferred.resolve(this._currentUser);
        } else if ($window.user) {
          this._currentUser = $window.user;
          deferred.resolve(this._currentUser)
        } else {
          User.getCurrent().then(function(fetchedUser) {
            this._currentUser = fetchedUser;
            $window.user = fetchedUser;
            userState.isLoggedIn = true;
            deferred.resolve(fetchedUser);
          },
          function(response) {
            this._currentUser = null;
            $window.user = null;
            userState.isLoggedIn = false;
            deferred.reject('User data could not be fetched from server');
          });
        }

        return deferred.promise;
      },

      isAuthenticated: function() {
        return !!this._currentUser && this._currentUser.username;
      },

      getUserState: function() {
        return userState;
      },

      login: function(new_user) {
        userState.isLoggedIn = true;
        this._currentUser = new_user;
      },

      logout: function() {
        $window.user = null;
        userState.isLoggedIn = false;
        this._currentUser = null;
      }
    };
    return service;

  }
]);
