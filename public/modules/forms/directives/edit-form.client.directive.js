'use strict';

angular.module('forms')
.directive('editFormDirective', ['$rootScope', '$q', '$http', '$timeout', 'timeCounter', 'Auth', 'FormFields',
    function ($rootScope, $q, $http, $timeout, timeCounter, Auth, FormFields) {
        return {
            templateUrl: './modules/forms/views/directiveViews/form/edit-form.html',
            restrict: 'E',
            scope: {
                myform:'=',
            },
            // transclude: true,
            controller: function($scope){

                // Log that the directive has been linked.
                // console.log( "Linked: editForm Controller");

                /*
                **  Initialize scope with variables
                */
                //Populate AddField with all available form field types
                $scope.addField = {};
                $scope.addField.types = FormFields.fields;

                $scope.addField.types.forEach(function(type){
                    type.lastAddedID = 1;
                    return type;
                });

                // accordion settings
                $scope.accordion = {};
                $scope.accordion.oneAtATime = true;

                //Populate local scope with rootScope methods/variables
                $scope.update = $rootScope.update;

                /*
                ** FormFields (ui-sortable) drag-and-drop configuration
                */
                $scope.dropzone = {
                    handle: ' .handle'  
                }

                // console.log($scope.myform);

                // $scope.draggable = {
                //     connectWith: ".dropzone",
                //     start: function (e, ui) {
                //         // $scope.$apply(function() {
                //         //   $scope.dragging = true
                //         // });
                //         $('.dropzone').sortable('refresh');
                //     },
                //     update: function (e, ui) {
                //         var isInDropzone = $(e.target).parentsUntil('.panel-group').hasClass('dropzone');

                //         console.log('isInDropzone: '+isInDropzone);
                //         //Disable drag and drop if we aren't in dropzone
                //         if(!isInDropzone){
                //             ui.item.sortable.cancel();
                //         }
                //     },
                //     stop: function (e, ui) {
                //         var isInDropzone = $(e.target).parentsUntil('.panel-group').hasClass('dropzone');

                //         //Disable drag and drop if we aren't in dropzone
                //         if(isInDropzone){
                //             console.log($(e.target));
                //         }
                        
                //         // if (ui.item.sortable.droptarget === undefined) {
                //         //     $scope.$apply($scope.dragging = false);
                //         //     return;
                //         // }else if (ui.item.sortable.droptarget[0].classList[0] === "dropzone") {
                //         //     // run code when item is dropped in the dropzone
                //         //     $scope.$apply($scope.dragging = false);
                //         // }else{
                //         //   // $scope.$apply($scope.dragging = false);
                //         // }
                //         // console.log('has class .dropzone :'+);
                //         // if ($(e.target).hasClass('dropzone') && ui.item.sortable.droptarget && e.target != ui.item.sortable.droptarget[0] ) {
                //         //     // restore original types
                //         //     $scope.addField.types = FormFields.fields;
                //         // }
                      
                        
                //     }
                // };


                /*
                **  Field CRUD Methods
                */
                // Add a new field
                $scope.addNewField = function(fieldType){

                    // incr field_id counter
                    $scope.addField.lastAddedID++;
                    var fieldTitle;

                    for(var i = 0; i < $scope.addField.types.length; i++){
                        // console.log($scope.addField.types[i].name === fieldType);
                        if($scope.addField.types[i].name === fieldType){ 
                            $scope.addField.types[i].lastAddedID++;
                            // console.log($scope.addField.types[i].lastAddedID);
                            fieldTitle = $scope.addField.types[i].value+$scope.addField.types[i].lastAddedID;  
                            break;
                        }
                    }
                    var newField = {
                        'title' : fieldTitle,
                        'fieldType' : fieldType,
                        'fieldValue' : '',
                        'required' : true,
                        'disabled' : false,
                    };

                    // put newField into fields array
                    $scope.myform.form_fields.push(newField);
                    // console.log('\n\n---------\nAdded field CLIENT');
                    // console.log(Date.now());
                    // console.log($scope.myform.form_fields.length);
                };

                // deletes particular field on button click
                $scope.deleteField = function (hashKey){
                    // console.log($scope.myform.form_fields);
                    for(var i = 0; i < $scope.myform.form_fields.length; i++){
                        // console.log($scope.myform.form_fields[i].$$hashKey === hashKey);
                        if($scope.myform.form_fields[i].$$hashKey === hashKey){
                            $scope.myform.form_fields.splice(i, 1);                      
                            break;
                        }
                    }
                };
                $scope.duplicateField = function (field, field_index){
                    for(var i = 0; i < $scope.myform.form_fields.length; i++){
                        if($scope.myform.form_fields[i].field_id === field.field_id){
                            $scope.addNewField($scope.myform.form_fields[i].fieldType);
                            break;
                        }
                    }
                };

                /*
                **  Field Option Methods
                */

                // add new option to the field
                $scope.addOption = function (field){
                    if(!field.fieldOptions) field.fieldOptions = [];

                    var lastOptionID = 0;

                    if(field.fieldOptions[field.fieldOptions.length-1])
                        lastOptionID = field.fieldOptions[field.fieldOptions.length-1].option_id;

                    // new option's id
                    var option_id = lastOptionID + 1;

                    var newOption = {
                        'option_id' : option_id,
                        'option_title' : 'Option ' + option_id,
                        'option_value' : option_id
                    };

                    // put new option into fieldOptions array
                    field.fieldOptions.push(newOption);
                };

                // delete particular option
                $scope.deleteOption = function (field, option){
                    for(var i = 0; i < field.fieldOptions.length; i++){
                        if(field.fieldOptions[i].option_id === option.option_id){
                            field.fieldOptions.splice(i, 1);
                            break;
                        }
                    }
                };

                // decides whether field options block will be shown (true for dropdown and radio fields)
                $scope.showAddOptions = function (field){
                    if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'scale' || field.fieldType === 'rating' || field.fieldType === 'radio'){
                        return true;
                    } else {
                        return false;
                    }
                };

            },
  
        };
    }
]);