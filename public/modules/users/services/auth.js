'use strict';

angular.module('AvianServer')
  .factory('Auth', function($cookies) {
    var userState =
    {
      // isLoggedIn: $cookies.get('isLoggedIn')
      isLoggedIn: false
    };

    return {
      currentUser: null,

      // Note: we can't make the User a dependency of Auth
      // because that would create a circular dependency
      // Auth <- $http <- $resource <- LoopBackResource <- User <- Auth
      ensureHasCurrentUser: function(User) {
        if (this.currentUser) {
          console.log('Using cached current user.');
          console.log(this.currentUser);
        } else{
          console.log('Fetching current user from the server.');
          this.currentUser = User.getCurrent(function() {
            // success
            userState.isLoggedIn = true; 
            $cookies.put('isLoggedIn', 'true');           
          },
          function(response) {
            userState.isLoggedIn = false;
            $cookies.put('isLoggedIn', 'false');
            console.log('User.getCurrent() err', response);
          });
        }
      },

      getUserState: function() {
        return userState;
      },

      login: function() {
        userState.isLoggedIn = true;
        $cookies.put('isLoggedIn', 'true');
        this.ensureHasCurrentUser(null);
      },

      logout: function() {
        this.currentUser = null;
        userState.isLoggedIn = false;
        $cookies.put('isLoggedIn', 'false');
      },
    };
  });
