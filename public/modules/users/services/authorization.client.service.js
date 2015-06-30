// 'use strict';

// angular.module('users').service('Authorization', ['$rootScope', '$location', 'Principal',
//   function($rootScope, $location, Principal) {

//       this.authorize = function() {
//         return Principal.identity().then(function(){   
//           var isAuthenticated = Principal.isAuthenticated();
//           if( angular.isDefined($rootScope.toState.data) ){ 
//             // if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
//               if (!isAuthenticated){ //$location.path('/access_denied'); // user is signed in but not authorized for desired state
//                 // console.log('isAuthenticated: '+isAuthenticated);

//               // else {
//                 // user is not authenticated. so the state they wanted before you
//                 // send them to the signin state, so you can return them when you're done
//                 $rootScope.returnToState = $rootScope.toState;
//                 $rootScope.returnToStateParams = $rootScope.toStateParams;

//                 // now, send them to the signin state so they can log in
//                 $location.path('/signin');
//               }
//             // }
//           }
//         });
//       };
//   }
// ]);