'use strict';

angular.module('users').factory('Authorization', ['$rootScope', '$http', '$q', '$state', 'Principal',
  function($rootScope, $http, $q, $state, Principal) {
    var service = {
      authorize: function(){
        var deferred = $q.defer();
        $http.get('/user/me').success(function(response) {
            

            //user is logged in
            if(response.data !== null){
              deferred.resolve();
            }else {
              $rootScope.message = 'You need to log in.';
              deferred.reject();
              $state.go('/login');
            }
            
        });
        return deferred.promise();
      }
    };
    return service;
      // this.authorize = function() {
      //   return Principal.identity().then(function(){   
      //     var isAuthenticated = Principal.isAuthenticated();
      //     if( angular.isDefined($rootScope.toState.data) ){ 
      //       // if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
      //         if (!isAuthenticated){ //$location.path('/access_denied'); // user is signed in but not authorized for desired state
      //           // console.log('isAuthenticated: '+isAuthenticated);

      //         // else {
      //           // user is not authenticated. so the state they wanted before you
      //           // send them to the signin state, so you can return them when you're done
      //           $rootScope.returnToState = $rootScope.toState;
      //           $rootScope.returnToStateParams = $rootScope.toStateParams;

      //           // now, send them to the signin state so they can log in
      //           $location.path('/signin');
      //         }
      //       // }
      //     }
      //   });
      // };
  }
]);