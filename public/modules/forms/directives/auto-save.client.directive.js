'use strict';

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
  return {
    require: ['^form'],
    link: function($scope, $element, $attrs, $ctrls) {

      if(!$rootScope.watchCount === undefined){
        $rootScope.watchCount = 0;
      }
      var difference = function(array){
        var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));

        var containsEquals = function(obj, target) {
          if (obj == null) return false;
          return _.any(obj, function(value) {
            return _.isEqual(value, target);
          });
        };

        return _.filter(array, function(value){ return !containsEquals(rest, value); });
      };

      var $formCtrl = $ctrls[0];
      var savePromise = null;
      $scope.finishedRender = false;
      var expression = $attrs.autoSaveForm || 'true';

      $scope.$on('ngRepeatStarted', function(ngRepeatFinishedEvent) {
        $scope.finishedRender = false;
        $rootScope.watchCount = 0;
      });
      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $scope.finishedRender = true;
      });

      $scope.$watch('myform.form_fields', function(newValue, oldValue) {

        if(difference(oldValue,newValue).length === 0 || oldValue === undefined){
          return;
        }

        // console.log('\n\n-------\n$pristine: '+( $formCtrl.$pristine ) );
        // console.log('$dirty: '+( $formCtrl.$dirty ) );
        // console.log('form_fields changed: '+difference(oldValue.form_fields,newValue.form_fields).length );
        // console.log('$valid: '+$formCtrl.$valid);
        // console.log('finishedRender: '+$scope.finishedRender);
        // console.log('saveInProgress: '+$scope.saveInProgress);
          
        if($scope.finishedRender && ($formCtrl.$dirty || difference(oldValue,newValue).length !== 0) ) {
          $rootScope.watchCount++;
          if($rootScope.watchCount === 1) {
            
            if(savePromise) {
              $timeout.cancel(savePromise);
            }

            savePromise = $timeout(function() {
              savePromise = null;

              // Still valid?
              // if($formCtrl.$valid) {
              if($scope.$eval(expression) !== false) {
                console.log('Form data persisted -- setting pristine flag');
                $formCtrl.$setPristine();  
              }
              // }
            
            });
          }
        }
        
      }, true);
    }
  };
  
}]);