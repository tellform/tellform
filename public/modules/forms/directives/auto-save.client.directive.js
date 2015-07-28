'use strict';

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
  return {
    require: ['^form'],
    // scope: {
    //     callback: '&autoSaveCallback'
    // },
    link: function($scope, $element, $attrs, $ctrls) {

      $rootScope.finishedRender = false;

      if($rootScope.watchCount === undefined){
        $rootScope.watchCount = 0;
      }

      var difference = function(array){
        var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));

        var containsEquals = function(obj, target) {
          if (obj === null) return false;
          return _.any(obj, function(value) {
            return _.isEqual(value, target);
          });
        };

        return _.filter(array, function(value){ return !containsEquals(rest, value); });
      };

      var $formCtrl = $ctrls[0];
      var savePromise = null;
      // $scope.finishedRender = false;
      var expression = $attrs.autoSaveForm || 'true';

      $scope.$on('ngRepeatStarted', function(ngRepeatFinishedEvent) {
        $rootScope.finishedRender = false;
        $rootScope.watchCount = 0;
      });
      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $rootScope.finishedRender = true;
      });

      $scope.$watch('myform.form_fields', function(newValue, oldValue) {
        console.log('watchCount: '+$rootScope.watchCount);
        if(difference(oldValue,newValue).length === 0 || oldValue === undefined){
          return;
        }

        // console.log('\n\n----------\n$dirty: '+( $formCtrl.$dirty ) );
        // console.log('form_fields changed: '+difference(oldValue,newValue).length );
        // console.log('$valid: '+$formCtrl.$valid);
        // console.log('finishedRender: '+$rootScope.finishedRender);
        // console.log('saveInProgress: '+$rootScope.saveInProgress);
          
        if($rootScope.finishedRender && ($formCtrl.$dirty || difference(oldValue,newValue).length !== 0) && !$rootScope.saveInProgress) {
          $rootScope.watchCount++;
         
          // if($rootScope.watchCount === 1) {
            
            if(savePromise) {
              $timeout.cancel(savePromise);
            }

            savePromise = $timeout(function() {
              savePromise = null;

              $rootScope[$attrs.autoSaveCallback](
                function(err){
                  if(!err){
                    console.log('\n\nForm data persisted -- setting pristine flag');
                    // console.log('\n\n---------\nUpdate form CLIENT');
                    // console.log(Date.now());
                    $rootScope.watchCount = 0;
                    $formCtrl.$setPristine();  
                    // $rootScope.saveInProgress = false;
                  }else{
                    console.log('Error form data NOT persisted');
                    console.log(err);
                  }
                });
            
            });

          // }
        }else{
          return;
        }
        
      }, true);
    }
  };
  
}]);