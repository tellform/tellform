'use strict';

function removeDateFieldsFunc(o) {
    var clone = _.clone(o);
    function eachObject(v,k){

		if(k === 'lastModified' || k === 'created'){
        	delete clone[k];
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

                var debounceSave = function (diffChanges) {

                    $rootScope[$attrs.autoSaveCallback](true, diffChanges,
                        function(err){
                        if(!err){
                            $formCtrl.$setPristine();
                            $formCtrl.$setUntouched();
                        }else{
                            console.error('Error form data NOT persisted');
                            console.error(err);
                        }
                    });
                };

                //Autosave Form when model (specified in $attrs.autoSaveWatch) changes
                $scope.$watch($attrs.autoSaveWatch, function(newValue, oldValue) {

					if( !newValue || !oldValue ) {
						$rootScope.finishedRender = true;
						return;
					}

                    newValue = angular.copy(newValue);
                    oldValue = angular.copy(oldValue);

					delete newValue.visible_form_fields;
					delete oldValue.visible_form_fields;
					newValue.form_fields = _.removeDateFields(newValue.form_fields);
					oldValue.form_fields = _.removeDateFields(oldValue.form_fields);
					
					var changedFields = !!DeepDiff.diff(oldValue, newValue) && DeepDiff.diff(oldValue, newValue).length > 0;

					console.log(DeepDiff.diff(oldValue, newValue));
					//If our form is undefined, don't save form
					if(!changedFields){
						$rootScope.finishedRender = true;
						return;
					}

					if(oldValue.form_fields.length === 0) {
						$rootScope.finishedRender = true;
					}

					//console.log('Autosaving');
					//console.log('\n\n----------');
                    //console.log('!$dirty: '+ !$formCtrl.$dirty );

                    // console.log('changedFieldMap: '+changedFieldMap);
					//console.log('finishedRender: '+$rootScope.finishedRender);
                    //console.log('!saveInProgress: '+!$rootScope.saveInProgress);
                    // console.log('newValue: '+newValue);
                    // console.log('oldValue: '+oldValue);
                    // console.log(oldValue.form_fields);
                    // console.log(newValue.form_fields);

                    //Save form ONLY IF rendering is finished, form_fields have been changed AND currently not save in progress
                    if( $rootScope.finishedRender && (changedFields) && !$rootScope.saveInProgress) {

                        if(savePromise) {
                            $timeout.cancel(savePromise);
                            savePromise = null;
                        }

                        savePromise = $timeout(function() {
							$rootScope.saveInProgress = true;

							delete newValue.visible_form_fields;
							delete newValue.visible_form_fields;
							var _diff = DeepDiff.diff(oldValue, newValue);
                            debounceSave(_diff);
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
