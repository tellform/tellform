'use strict';

angular.module('users')
  .factory('Auth',  function() {
    var userState =
    {
      // isLoggedIn: $cookies.get('isLoggedIn')
      isLoggedIn: false
      // user: null
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
          return this.currentUser;
        } else{
          console.log('Fetching current user from the server.');
          this.currentUser = User.getCurrent(function() {
            // success
            userState.isLoggedIn = true; 
            // $cookies.put('isLoggedIn', 'true');  
            return this.currentUser;         
          },
          function(response) {
            userState.isLoggedIn = false;
            // $cookies.put('isLoggedIn', 'false');
            console.log('User.getCurrent() err', response);
            return null;
          });
        }
      },

      getUserState: function(user) {
        // userState.user = ensureHasCurrentUser(user);
        return userState;
      },

      login: function(user) {
        // userState.isLoggedIn = true;
        // $cookies.put('isLoggedIn', 'true');
        this.ensureHasCurrentUser(user);
      },

      logout: function() {
        this.ensureHasCurrentUser(null);   
      },
    };
  });
