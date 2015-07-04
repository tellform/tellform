'use strict';

angular.module('forms').directive('editFormDirective', ['$http', '$timeout', 'timeCounter', 'Auth', 'FormFields',
    function ($http, $timeout, timeCounter, Auth, FormFields) {
        return {
            controller: function($scope){
                //Populate AddField with all available form field types
                $scope.addField = {};
                $scope.addField.types = FormFields.fields;
                // $scope.addField.new = $scope.addField.types[0].name;
                $scope.addField.types.forEach(function(type){
                    type.lastAddedID = 0;
                    return type;
                });

                // accordion settings
                $scope.accordion = {};
                $scope.accordion.oneAtATime = true;

                // create new field button click
                $scope.addNewField = function(fieldType){

                    // incr field_id counter
                    $scope.addField.lastAddedID++;
                    var fieldTitle;
                    for(var i = 0; i < $scope.addField.types.length; i++){
                        console.log($scope.addField.types[i].name === fieldType);
                        if($scope.addField.types[i].name === fieldType){
                            $scope.addField.types[i].lastAddedID++;
                            fieldTitle = $scope.addField.types[i].value+$scope.addField.types[i].lastAddedID;  
                            break;
                        }
                    }
                    var newField = {
                        'title' : fieldTitle,
                        'fieldType' : fieldType,
                        'fieldValue' : '',
                        'required' : true,
                        'disabled' : false
                    };

                    // put newField into fields array
                    $scope.form.form_fields.unshift(newField);
                };

                // deletes particular field on button click
                $scope.deleteField = function (hashKey){
                    console.log($scope.form.form_fields);
                    for(var i = 0; i < $scope.form.form_fields.length; i++){
                        console.log($scope.form.form_fields[i].$$hashKey === hashKey);
                        if($scope.form.form_fields[i].$$hashKey === hashKey){
                            $scope.form.form_fields.splice(i, 1);                      
                            break;
                        }
                    }
                };
                $scope.duplicateField = function (field, field_index){
                    for(var i = 0; i < $scope.form.form_fields.length; i++){
                        if($scope.form.form_fields[i].field_id === field.field_id){
                            // $scope.form.form_fields.splice(field_index+1, 0, field);
                            $scope.addNewField($scope.form.form_fields[i].fieldType);
                            break;
                        }
                    }
                };

                $scope.hover = function(field) {
                    // Shows/hides the delete button on hover
                    return field.showTools = !field.showTools;
                };

                // add new option to the field
                $scope.addOption = function (field){
                    if(!field.field_options)
                        field.field_options = [];

                    var lastOptionID = 0;

                    if(field.field_options[field.field_options.length-1])
                        lastOptionID = field.field_options[field.field_options.length-1].option_id;

                    // new option's id
                    var option_id = lastOptionID + 1;

                    var newOption = {
                        'option_id' : option_id,
                        'option_title' : 'Option ' + option_id,
                        'option_value' : option_id
                    };

                    // put new option into field_options array
                    field.field_options.push(newOption);
                };

                // delete particular option
                $scope.deleteOption = function (field, option){
                    for(var i = 0; i < field.field_options.length; i++){
                        if(field.field_options[i].option_id === option.option_id){
                            field.field_options.splice(i, 1);
                            break;
                        }
                    }
                };

                // decides whether field options block will be shown (true for dropdown and radio fields)
                $scope.showAddOptions = function (field){
                    if(field.field_type === 'radio' || field.field_type === 'dropdown')
                        return true;
                    else
                        return false;
                };

            },
            templateUrl: './modules/forms/views/directiveViews/form/edit-form.html',
            restrict: 'E',
            scope: {
                form:'=',
                user:'='
            }
        };
    }
]);