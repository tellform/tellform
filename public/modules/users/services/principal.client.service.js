// 'use strict';

// angular.module('users').factory('AuthenticationService', function($http, $timeout, $q) {
//   var error;
//   var service = {
//       // Information about the current user
//       currentUser: null,

//       login: function(credentials) {
//           var login = $http.post('/auth/signin', credentials);
//           login.success(function(data) {
//               service.currentUser = data.user;
//               // $flash.clear();
//           }).error(function(error) {
//               error = error.error ? error.error : error;
//               console.error(error.message || error);
//           });
//           return login;
//       },

//       logout: function() {
//           var logout = $http.get('/auth/logout');
//           logout.success(function() {
//               service.currentUser = null;
//               console.log("You've successfully logged out");
//           });
//           return logout;
//       },

//       signup: function(credentials) { 
//         var signup = $http.post('/auth/signup', credentials)
//         signup.success(function(response) {
//             console.log("You've successfully created an account");
//         }).error(function(response) {
//             error = error.error ? error.error : error;
//             console.error(error.message || error);
//         });

//         return signup;
//       },

//       // Ask the backend to see if a user is already authenticated -
//       // this may be from a previous session.
//       identity: function() {
//           if (service.isAuthenticated()) {
//               return $q.when(service.currentUser);
//           } else {
//               return $http.get('/user/me').then(function(response) {
//                   service.currentUser = response.data.user;
//                   return service.currentUser;
//               });
//           }
//       },

//       // Is the current user authenticated?
//       isAuthenticated: function() {
//           return !!service.currentUser;
//       },

//       isInRole: function(role) {
//         return service.isAuthenticated() (service.currentUser.roles.indexOf(role) !== -1);
//       },

//       isInAnyRole: function(roles) {
//         if ( !service.isAuthenticated() || !service.currentUser.roles) return false;
//         var roles = service.currentUser.roles;

//         for (var i = 0; i < roles.length; i++) {
//           if (this.isInRole(roles[i])) return true;
//         }

//         return false;
//       },

//   };
//   return service;
// });

// // .factory('Principal', ['$window', '$http', '$q', '$timeout', '$state',
// //   function($window, $http, $q, $timeout, $state) {
// //     var _identity,
// //       _authenticated = false;

// //     return {
// //       isIdentityResolved: function() {
// //         return angular.isDefined(_identity);
// //       },
// //       isAuthenticated: function() {
// //         return _authenticated;
// //       },
//       // isInRole: function(role) {
//       //   if (!_authenticated || !_identity.roles) return false;

//       //   return _identity.roles.indexOf(role) !== -1;
//       // },
//       // isInAnyRole: function(roles) {
//       //   if (!_authenticated || !_identity.roles) return false;

//       //   for (var i = 0; i < roles.length; i++) {
//       //     if (this.isInRole(roles[i])) return true;
//       //   }

//       //   return false;
//       // },
// //       authenticate: function(user) {
// //         _identity = user;
// //         _authenticated = (user !== null);
        
// //         // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
// //         if (user) $window.user = user;
// //         else $window.user = null;
// //       },
// //       signin: function(credentials) {

// //         var deferred = $q.defer();
// //         var self = this;
// //         $http.post('/auth/signin', credentials).success(function(response) {
// //             // If successful we assign the response to the global user model
// //             self.authenticate(response);
// //             deferred.resolve(response);
// //           }).error(function(response) {
// //             _authenticated = false;
// //             deferred.reject({ error: response.message });
// //           });
// //           return deferred.promise;
// //       },
// //       signup: function(credentials) { 

// //         var deferred = $q.defer();

// //         $http.post('/auth/signup', credentials).success(function(response) {
// //           // If successful we assign the response to the global user model
// //           deferred.resolve(response);
// //         }).error(function(response) {

// //           deferred.reject({ error: response.message });
// //         });

// //         return deferred.promise;
// //       },
// //       signout: function() { 
// //         var deferred = $q.defer();
// //         $http.get('/auth/signout').success(function(response) {
// //           // If successful we assign the response to the global user model
// //           deferred.resolve({});
// //         }).error(function(response) {
// //           deferred.reject({ error: response.message });
// //         });

// //         _authenticated = false;
// //         _identity = undefined;

// //         return deferred.promise;
// //       },
// //       identity: function() {
// //         var self = this;

// //         var deferred = $q.defer();

// //         // check and see if we have retrieved the user data from the server. if we have, reuse it by immediately resolving
// //         if (angular.isDefined(_identity)) {

// //           deferred.resolve(_identity);
// //           return deferred.promise;
// //         }else if($window.user){
// //           // console.log($window.user);
// //           // self.authenticate($window.user);
// //           // var user = $window.user;
// //           _identity = $window.user;
// //           self.authenticate(_identity);
// //           deferred.resolve(_identity);

// //           return deferred.promise;
// //         }else {

// //         	// otherwise, retrieve the user data from the server, update the user object, and then resolve.
// //           $http.get('/users/me', { ignoreErrors: true })
// //       		  .success(function(response) {
// //       		    self.authenticate(response);
// //               $window.user = response;
// //       		    deferred.resolve(_identity);
// //       		  })
// //       		  .error(function() {
// //       		    _identity = null;
// //       		    _authenticated = false;
// //               $window.user = null;
// //       		    $state.path('signin');
// //       		    deferred.resolve(_identity);
// //       		  });
 
// //           return deferred.promise;
// //         }
// //       },
// //       getUser: function(){
// //         this.identity(false).then( function(user){
// //           return user;
// //         });
// //       }
// //     };
   
// //   }
// // ]);
