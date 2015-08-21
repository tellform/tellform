'use strict';

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
  return {
    require: ['^form'],
    restrict: 'AE',
    link: function($scope, $element, $attrs, $ctrls) {
      angular.element(document).ready(function() {
      
        var $formCtrl = $ctrls[0],
            savePromise = null;

        $rootScope.finishedRender = false;
        $scope.$on('editFormFieldsStarted', function(ngRepeatFinishedEvent) {
            $rootScope.finishedRender = false;
          });
        $scope.$on('editFormFieldsFinished', function(ngRepeatFinishedEvent) {
          $rootScope.finishedRender = true;
        });

        $scope.anyDirtyAndTouched = function(form){
          var propCount = 0;
          for(var prop in form) {
            if(form.hasOwnProperty(prop) && prop[0] !== '$') {
              propCount++;
              if(form[prop].$touched && form[prop].$dirty) {
                return true;
              }
            }
          }
          return false;
        };

        var debounceSave = function () {
          $rootScope.saveInProgress = true;
          $rootScope[$attrs.autoSaveCallback](true,
            function(err){
              if(!err){
                console.log('\n\nForm data persisted -- setting pristine flag');
                $formCtrl.$setPristine(); 
              }else{
                console.error('Error form data NOT persisted');
                console.error(err);
              }
            }); 
        };

        //Update/save Form if any Form fields are Dirty and Touched
        $scope.$watch(function(newValue, oldValue) {
          if($scope.anyDirtyAndTouched($scope.editForm) && !$rootScope.saveInProgress){
            debounceSave();
          }
        });

        //Autosave Form when model (specificed in $attrs.autoSaveWatch) changes
        $scope.$watch($attrs.autoSaveWatch, function(newValue, oldValue) {

          var changedFields = !_.isEqual(oldValue,newValue);
          if( (!newValue && !oldValue) || !oldValue ){
            return;
          }

          // console.log('\n\n----------');
          // console.log('$dirty: '+ $formCtrl.$dirty );
          // console.log('changedFields: '+changedFields);
          // console.log('finishedRender: '+$rootScope.finishedRender);
          // console.log('saveInProgress: '+$rootScope.saveInProgress);
          // console.log('newValue: '+newValue);
          // console.log('oldValue: '+oldValue);

          //Save form ONLY IF rendering is finished, form_fields have been change AND currently not save in progress
          if($rootScope.finishedRender && (changedFields && !$formCtrl.$dirty) && !$rootScope.saveInProgress) {

            if(savePromise) {
              $timeout.cancel(savePromise);
              savePromise = null;
            }

            savePromise = $timeout(function() {   
              console.log('Saving Form');
              debounceSave();           
            }); 
          }
          //If we are finished rendering then form saving should be finished
          else if($rootScope.finishedRender && $rootScope.saveInProgress){
            $rootScope.saveInProgress = false;
          }

        }, true);



      });

    }
  };
  
}]);
