'use strict';


function removeDateFieldsFunc(o) {
    var clone = _.clone(o);
    function eachObject(v,k){
        
		if(k === 'lastModified' || k === 'created'){
        	delete clone[i][k];
        }
	}

	for(var i=0; i<clone.length; i++){
        _.each(clone[i], eachObject); 
    }
    return clone;
}

_.mixin({ removeDateFields : removeDateFieldsFunc });

angular.module('forms').directive('autoSaveForm', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  
    return {
        require: ['^form'],
        restrict: 'AE',
        link: function($scope, $element, $attrs, $ctrls) {
            //DAVID: TODO: Do we really need to check if our directive element is ready everytime
            angular.element(document).ready(function() {

                var $formCtrl = $ctrls[0],
                    savePromise = null;

                $rootScope.finishedRender = false;
                $scope.$on('editFormFields Started', function(ngRepeatFinishedEvent) {
                    // console.log('hello');
                    $rootScope.finishedRender = false;
                });
                $scope.$on('editFormFields Finished', function(ngRepeatFinishedEvent) {
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
                            $formCtrl.$setUntouched(); 
                        }else{
                            console.error('Error form data NOT persisted');
                            console.error(err);
                        }
                    }); 
                };

                //Update/Save Form if any Form fields are Dirty and Touched
                $scope.$watch(function(newValue, oldValue) {
                    console.log('introParagraphStartPage.$dirty: '+$scope.editForm.introParagraphStartPage.$dirty);
                    console.log('introParagraphStartPage.$touched: '+$scope.editForm.introParagraphStartPage.$touched);
                    if($rootScope.finishedRender && $scope.anyDirtyAndTouched($scope.editForm) && !$rootScope.saveInProgress){
                        console.log('Form saving started');
                        debounceSave();
                        console.log('introParagraphStartPage.$dirty AFTER: '+$scope.editForm.introParagraphStartPage.$dirty);
                    }
                });

                //Autosave Form when model (specificed in $attrs.autoSaveWatch) changes
                $scope.$watch($attrs.autoSaveWatch, function(newValue, oldValue) {

                    newValue = angular.copy(newValue);
                    oldValue = angular.copy(oldValue);

                    newValue.form_fields = _.removeDateFields(newValue.form_fields);
                    oldValue.form_fields = _.removeDateFields(oldValue.form_fields);

                    var changedFields = !_.isEqual(oldValue.form_fields,newValue.form_fields) || !_.isEqual(oldValue.startPage, newValue.startPage);
                    var changedFieldMap = false;

                    if(oldValue.hasOwnProperty('plugins.oscarhost.settings.fieldMap')){
                    	changedFieldMap = !!oldValue.plugins.oscarhost.settings.fieldMap && !_.isEqual(oldValue.plugins.oscarhost.settings.fieldMap,newValue.plugins.oscarhost.settings.fieldMap);
                    }

                    //If our form is undefined, don't save form
                    if( (!newValue && !oldValue) || !oldValue ){
                        return;
                    }
                      
                    // console.log('Autosaving');
                    // console.log('\n\n----------');
                    // console.log('!$dirty: '+ !$formCtrl.$dirty );
                    // console.log('changedFields: '+changedFields);
                    // console.log('changedFieldMap: '+changedFieldMap);
                    // console.log('finishedRender: '+$rootScope.finishedRender);
                    // console.log('!saveInProgress: '+!$rootScope.saveInProgress);
                    // console.log('newValue: '+newValue);
                    // console.log('oldValue: '+oldValue);
                    // console.log(oldValue.form_fields);
                    // console.log(newValue.form_fields);

                    if(oldValue.form_fields.length === 0) { 
                        $rootScope.finishedRender = true;
                    }

                    //Save form ONLY IF rendering is finished, form_fields have been changed AND currently not save in progress
                    if( $rootScope.finishedRender && ((changedFields && !$formCtrl.$dirty) || changedFieldMap)  && !$rootScope.saveInProgress) {

                        if(savePromise) {
                            $timeout.cancel(savePromise);
                            savePromise = null;
                        }

                        savePromise = $timeout(function() {   
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
