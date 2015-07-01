'use strict';

angular.module('users')
  .factory('Auth',  function($window) {
    var userState =
    {
      isLoggedIn: false
    };

    return {
      currentUser: null,

      // Note: we can't make the User a dependency of Auth
      // because that would create a circular dependency
      // Auth <- $http <- $resource <- LoopBackResource <- User <- Auth
      ensureHasCurrentUser: function(User) {
        if (this.currentUser && this.currentUser.displayName) {
          console.log('Using local current user.');
          console.log(this.currentUser);
          return this.currentUser;
        } 
        else if ($window.user){
          console.log('Using cached current user.');
          console.log($window.user);
          this.currentUser = $window.user;
          return this.currentUser;
        }
        else{
          console.log('Fetching current user from the server.');
          User.getCurrent().then(function(user) {
            // success
            this.currentUser = user;
            userState.isLoggedIn = true; 
            $window.user = this.currentUser;
            return this.currentUser;         
          },
          function(response) {
            userState.isLoggedIn = false;
            this.currentUser = null;
            $window.user = null;
            console.log('User.getCurrent() err', response);
            return null;
          });
        }
      },

      isAuthenticated: function() {
        return !!this.currentUser;
      },

      getUserState: function() {
        return userState;
      },

      login: function() {
        userState.isLoggedIn = true;
      },

      logout: function() {
        $window.user = null;
        userState.isLoggedIn = false;
        this.currentUser = null;
        this.ensureHasCurrentUser(null);   
      },
    };
  });
