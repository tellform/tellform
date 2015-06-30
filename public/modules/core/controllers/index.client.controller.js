'use strict';

/**
 * @ngdoc function
 * @name medform.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of core
 */
angular.module('medform').controller('IndexCtrl', function ($scope, $rootScope, $location, User, Auth, $state) {
    $rootScope.user = Auth.ensureHasCurrentUser(User);
    // $rootScope.user = Auth.getUserState(User).user;
    $rootScope.authorization = Auth;


    $scope.signin = function() {
      Auth.currentUser = User.login($scope.credentials,
        function(response) {

          // console.log(response);
          // Auth.currentUser = $rootScope.loginResult.user;
          Auth.login();
          $rootScope.user = Auth.ensureHasCurrentUser(User);

          // console.log( $rootScope.loginResult.user);

          $location.path('listForms');
        },
        function(res) {
          
          $scope.loginError = res.data.error;
          console.log('loginError: '+res.data.error);
          $rootScope.user = Auth.ensureHasCurrentUser(User);

          // if(!$scope.loginError){
            // Auth.currentUser = rootScope.loginResult.user;
            // console.log(Auth.currentUser );
          // }

          // Auth.currentUser = $rootScope.loginResult.user;
        }
      );

      console.log(Auth.currentUser);
      // Auth.currentUser = $rootScope.loginResult;

    };

    $scope.signup = function() {
      $scope.user = User.save($scope.registration,
        function() {
        },
        function(res) {
          if(res && res.data) {
            $scope.registerError = res.data.error;
          }else {
            console.log('No response received');
          }
        }
      );
    };

    $scope.signout = function() {
      User.logout(function() {
        Auth.logout();
        $rootScope.user = null;
        $state.go('home');
        // $scope.$apply();
      });
    };


  });
