'use strict';

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
  return {
    require: ['^form'],
    link: function($scope, $element, $attrs, $ctrls) {

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
        // $scope.finishedRender = false;
      });
      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $scope.finishedRender = true;
      });

      $scope.$watch('myform.form_fields', function(newValue, oldValue) {
        // console.log('auto saving');
        console.log(oldValue);
        console.log(newValue);
        if(difference(oldValue,newValue).length === 0 || oldValue === undefined){
          console.log('returning');
          return;
        }
        if(difference(oldValue,newValue).length !== 0 && !$formCtrl.$dirty) {
          $formCtrl.$setDirty();
        }
        // else if(difference(oldValue.form_fields,newValue.form_fields).length === 0 ){
        //   $scope.finishedRender = true;
        // }
        // console.log('\n\n-------\n$pristine: '+( $formCtrl.$pristine ) );
        // console.log('$dirty: '+( $formCtrl.$dirty ) );
        // console.log('form_fields changed: '+difference(oldValue.form_fields,newValue.form_fields).length );
        // console.log('$valid: '+$formCtrl.$valid);
        // console.log('finishedRender: '+$scope.finishedRender);
        // console.log('saveInProgress: '+$scope.saveInProgress);

        if($scope.finishedRender && ($formCtrl.$dirty || difference(oldValue,newValue).length !== 0)) {
          // console.log('auto saving');
          
          if(savePromise) {
            $timeout.cancel(savePromise);
          }

          savePromise = $timeout(function() {
            savePromise = null;

            // Still valid?
            if(true) {
              // console.log('inside');

              if($scope.$eval(expression) !== false) {
                // console.log('Form data persisted -- setting pristine flag');
                $formCtrl.$setPristine();  
                // $scope.finishedRender = false;
              }
            
            }
            
          });
        }
        
      }, true);
    }
  };
  
}]);