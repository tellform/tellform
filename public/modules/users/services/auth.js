'use strict';

angular.module('users')
  .factory('Auth',  function($window) {
    var userState =
    {
      isLoggedIn: false
    };

    var service = {
      currentUser: null,

      // Note: we can't make the User a dependency of Auth
      // because that would create a circular dependency
      // Auth <- $http <- $resource <- LoopBackResource <- User <- Auth
      ensureHasCurrentUser: function(User) {
        if (service.currentUser && service.currentUser.displayName) {
          // console.log('Using local current user.');
          // console.log(service.currentUser);
          return service.currentUser;
        } 
        else if ($window.user){
          // console.log('Using cached current user.');
          // console.log($window.user);
          service.currentUser = $window.user;
          return service.currentUser;
        }
        else{
          console.log('Fetching current user from the server.');
          User.getCurrent().then(function(user) {
            // success
            service.currentUser = user;
            userState.isLoggedIn = true; 
            $window.user = service.currentUser;
            return service.currentUser;         
          },
          function(response) {
            userState.isLoggedIn = false;
            service.currentUser = null;
            $window.user = null;
            console.log('User.getCurrent() err', response);
            return null;
          });
        }
      },

      isAuthenticated: function() {
        return !!service.currentUser;
      },

      getUserState: function() {
        return userState;
      },

      login: function(new_user) {
        userState.isLoggedIn = true;
        service.currentUser = new_user;
      },

      logout: function() {
        $window.user = null;
        userState.isLoggedIn = false;
        service.currentUser = null;
      },
    };
    return service;
  });
