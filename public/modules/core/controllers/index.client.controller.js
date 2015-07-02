// 'use strict';

// /**
//  * @ngdoc function
//  * @name medform.controller:IndexCtrl
//  * @description
//  * # IndexCtrl
//  * Controller of core
//  */
// angular.module('medform').controller('IndexCtrl', function ($scope, $rootScope, $location, User, Auth, $state) {
//     $rootScope.user = Auth.ensureHasCurrentUser(User);
//     // $rootScope.user = Auth.getUserState(User).user;
//     $rootScope.authentication = Auth;

//     $scope.signout = function() {
//       User.logout(function() {
//         Auth.logout();
//         $rootScope.user = null;
//         $state.go('home');
//         // $scope.$apply();
//       });
//     };


//   });
