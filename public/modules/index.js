'use strict';

/**
 * @ngdoc function
 * @name AvianServer.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the AvianServer
 */
angular.module('AvianServer')
  .controller('IndexCtrl', function ($scope, $location, User, Auth, $state) {
    Auth.ensureHasCurrentUser(User);
    $scope.user = Auth.getUserState();
    $scope.authorization = Auth;


    $scope.login = function() {
      Auth.currentUser = User.login($scope.credentials,
        function() {

          // console.log(response);
          // Auth.currentUser = $rootScope.loginResult.user;
          Auth.login();

          // console.log( $rootScope.loginResult.user);

          $location.path('home');
        },
        function(res) {
          
          $scope.loginError = res.data.error;
          console.log(res);

          if(!$scope.loginError){
            // Auth.currentUser = rootScope.loginResult.user;
            // console.log(Auth.currentUser );
          }

          // Auth.currentUser = $rootScope.loginResult.user;
        }
      );-

      console.log(Auth.currentUser);
      // Auth.currentUser = $rootScope.loginResult;

    };

    $scope.register = function() {
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

    $scope.logout = function() {
      User.logout(function() {
        Auth.logout();
        $state.go('index');
        $scope.$apply();
      });
    };


  });
