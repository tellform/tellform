'use strict';

angular.module('forms').directive('editFormDirective', ['$http', '$timeout', 'timeCounter', 'Auth', 'FormFields',
    function ($http, $timeout, timeCounter, Auth, FormFields) {
        return {
            controller: function($scope){
                //Populate AddField with all available form field types
                $scope.addField = {};
                $scope.addField.types = FormFields.fields;
                $scope.addField.new = $scope.addField.types[0].name;
                $scope.addField.lastAddedID = 0;

                // accordion settings
                $scope.accordion = {};
                $scope.accordion.oneAtATime = true;

                // create new field button click
                $scope.addNewField = function(){

                    // incr field_id counter
                    $scope.addField.lastAddedID++;

                    var newField = {
                        'title' : 'New field - ' + ($scope.addField.lastAddedID),
                        'fieldType' : $scope.addField.new,
                        'fieldValue' : '',
                        'required' : true,
                        'disabled' : false
                    };

                    // put newField into fields array
                    $scope.form.form_fields.unshift(newField);
                };

                // deletes particular field on button click
                $scope.deleteField = function (field_id){
                    for(var i = 0; i < $scope.form.form_fields.length; i++){
                        if($scope.form.form_fields[i].field_id === field_id){
                            $scope.form.form_fields.splice(i, 1);
                            break;
                        }
                    }
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