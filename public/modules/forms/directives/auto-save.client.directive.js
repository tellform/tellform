'use strict';

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
  return {
    require: ['^form'],
    link: function($scope, $element, $attrs, $ctrls) {

      $rootScope.finishedRender = false;

      var $formCtrl = $ctrls[0],
          savePromise = null;


      $scope.$on('editFormFieldsStarted', function(ngRepeatFinishedEvent) {
        $rootScope.finishedRender = false;
      });
      $scope.$on('editFormFieldsFinished', function(ngRepeatFinishedEvent) {
        $rootScope.finishedRender = true;
      });

      // $scope.anyDirtyAndTouched = function (form){
      //   console.log(form);
      //   console.log($scope.myform);


      //   for(var prop in form) {
      //     if(form.hasOwnProperty(prop) && prop[0] !== '$') {
      //        if(form[prop].$dirty && form[prop].$touched) {
      //          return true;
      //        }
      //     }
      //   }
      //   return false;
      // };

      // console.log($scope.watchModel);
      $scope.$watch($attrs.autoSaveWatch, function(newValue, oldValue) {
        console.log('hello');
        if( !newValue && !oldValue ){
          return;
        }
        var changedFields = !_.isEqual(oldValue,newValue);

        // console.log('\n\n----------');
        console.log('$dirty: '+( $formCtrl.$dirty ) );
        // console.log('oldValue: '+oldValue);
        // console.log('newValue: '+newValue);
        // console.log('form_fields changed: '+changedFields);
        // console.log('$valid: '+$formCtrl.$valid);
        // console.log('finishedRender: '+$rootScope.finishedRender);
        // console.log('saveInProgress: '+$rootScope.saveInProgress);

        // var inputDirtyUntouched = $scope.anyDirtyAndTouched($scope.editForm);
          
        //Save form ONLY IF rendering is finished, form_fields have been change AND currently not save in progress
        if($rootScope.finishedRender && (inputDirtyUntouched || changedFields) && !$rootScope.saveInProgress) {
            
            console.log('Saving Form');
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
                    $formCtrl.$setPristine();  
                    // $rootScope.saveInProgress = false;
                  }else{
                    console.error('Error form data NOT persisted');
                    console.error(err);
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