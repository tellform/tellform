'use strict';

angular.module('forms').directive('submitFormDirective', ['$http', 'TimeCounter', '$filter', '$rootScope', 'Auth',
    function ($http, TimeCounter, $filter, $rootScope, Auth) {
        return {
            templateUrl: 'modules/forms/views/directiveViews/form/submit-form.client.view.html',    
            restrict: 'E',
            scope: {
                myform:'='
            },
            controller: function($scope){
                $scope.authentication = $rootScope.authentication;

                $scope.reloadForm = function(){
                    //Reset Form
                    $scope.myform.submitted = false;
                    $scope.myform.form_fields = _.chain($scope.myform.form_fields).map(function(field){
                            field.fieldValue = '';
                            return field;
                        }).value();

                    $scope.error = '';
                    $scope.selected = {
                        _id: '',
                        index: null,
                    };

                    //Reset Timer
                    TimeCounter.restartClock(); 
                };

                /*
                ** Field Controls
                */
                $rootScope.setActiveField = function(field_id, field_index) {
                    if($scope.selected === null){
                        $scope.selected = {
                            _id: '',
                            index: 0,
                        };
                    }
                    console.log('field_id: '+field_id);
                    console.log('field_index: '+field_index);
                    console.log($scope.selected);

                    $scope.selected._id = field_id;
                    $scope.selected.index = field_index;
                    setTimeout(function() {
                        $('html, body').animate({
                            scrollTop: $('.activeField').offset().top
                        },200);
                    }, 10);
                };

                $scope.nextField = function(){
                    if($scope.selected.index < $scope.myform.form_fields.length-1){
                        $scope.selected.index++;
                        $scope.selected._id = $scope.myform.form_fields[$scope.selected.index]._id;
                        $rootScope.setActiveField($scope.selected._id, $scope.selected.index);
                    }
                };
                $scope.prevField = function(){
                    if($scope.selected.index > 0){
                        $scope.selected.index = $scope.selected.index - 1;
                        $scope.selected._id = $scope.myform.form_fields[$scope.selected.index]._id;
                        $rootScope.setActiveField($scope.selected._id, $scope.selected.index);
                    }
                };
                
                $scope.hideOverlay = function(){
                    $scope.selected = {
                        _id: '',
                        index: null,
                    };
                };

                /*
                ** Form Display Functions
                */
                $scope.exitStartPage = function(){
                    $scope.myform.startPage.showStart = false;
                    if($scope.myform.form_fields.length > 0){ 
                        $scope.selected._id = $scope.myform.form_fields[0]._id;
                    }
                };

                $scope.submitForm = function(){
                    var _timeElapsed = TimeCounter.stopClock();

                    var form = _.cloneDeep($scope.myform);
                    form.timeElapsed = _timeElapsed;

                    form.percentageComplete = $filter('formValidity')($scope.myform)/$scope.myform.visible_form_fields.length*100;
                    delete form.visible_form_fields;

                    $scope.submitPromise = $http.post('/forms/'+$scope.myform._id, form)
                        .success(function(data, status, headers){
                            console.log('form submitted successfully');
                            $scope.myform.submitted = true;
                        })
                        .error(function(error){
                            console.log(error);
                            $scope.error = error.message;
                        });
                };

                //Load our form when the page is ready
                angular.element(document).ready(function() {
                    $scope.reloadForm();
                });

            }
        };
    }
]);