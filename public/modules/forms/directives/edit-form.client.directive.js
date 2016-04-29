'use strict';

angular.module('forms').directive('editFormDirective', ['$rootScope', 'FormFields',
    function ($rootScope, FormFields) {
        return {
            templateUrl: 'modules/forms/views/directiveViews/form/edit-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'='
            },
            controller: function($scope){
                var field_ids = _($scope.myform.form_fields).pluck('_id');
                for(var i=0; i<field_ids.length; i++){
                    $scope.myform.plugins.oscarhost.settings.fieldMap[field_ids[i]] = null;
                }
                /*
                **  Initialize scope with variables
                */
                //Populate AddField with all available form field types
                $scope.addField = {};
                $scope.addField.types = FormFields.types;

                $scope.addField.types.forEach(function(type){
                    type.lastAddedID = 1;
                    return type;
                });

                $scope.lastButtonID = 0;

                // Accordion settings
                $scope.accordion = {};
                $scope.accordion.oneAtATime = true;

                //Populate local scope with rootScope methods/variables
                $scope.update = $rootScope.update;

                //Many-to-many Select for Mapping OscarhostFields -> FormFields
                $scope.oscarFieldsLeft = function(field_id){

                    if($scope.myform && $scope.myform.plugins.oscarhost.settings.validFields.length > 0){
                        if(!$scope.myform.plugins.oscarhost.settings.fieldMap) $scope.myform.plugins.oscarhost.settings.fieldMap = {};

                        var oscarhostFields = $scope.myform.plugins.oscarhost.settings.validFields;
                        var currentFields = _($scope.myform.plugins.oscarhost.settings.fieldMap).invert().keys().value();

                        if( $scope.myform.plugins.oscarhost.settings.fieldMap.hasOwnProperty(field_id) ){
                            currentFields = _(currentFields).difference($scope.myform.plugins.oscarhost.settings.fieldMap[field_id]);
                        }

                        //Get all oscarhostFields that haven't been mapped to a formfield
                        return _(oscarhostFields).difference(currentFields).value();
                    }
                    return [];
                };

                /*
                ** FormFields (ui-sortable) drag-and-drop configuration
                */
                $scope.dropzone = {
                    handle: ' .handle',
                    containment: '.dropzoneContainer',
                    cursor: 'grabbing'
                };

                /*
                **  Field CRUD Methods
                */
                // Add a new field
                $scope.addNewField = function(modifyForm, fieldType){

                    // incr field_id counter
                    $scope.addField.lastAddedID++;
                    var fieldTitle;

                    for(var i = 0; i < $scope.addField.types.length; i++){
                        if($scope.addField.types[i].name === fieldType){
                            $scope.addField.types[i].lastAddedID++;
                            fieldTitle = $scope.addField.types[i].value+$scope.addField.types[i].lastAddedID;
                            break;
                        }
                    }
                    var newField = {
                        title: fieldTitle,
                        fieldType: fieldType,
                        fieldValue: '',
                        required: true,
                        disabled: false,
                        deletePreserved: false
                    };
                    // console.log('\n\n---------\nAdded field CLIENT');
                    // console.log(newField);
                    // newField._id = _.uniqueId();

                    // put newField into fields array
                    if(modifyForm){
                        $scope.myform.form_fields.push(newField);
                    }
                    return newField;
                };

                // Delete particular field on button click
                $scope.deleteField = function (field_index){

                    //Delete field from field map
                    var currFieldId = $scope.myform.form_fields[field_index]._id;
                    if($scope.myform.hasOwnProperty('plugins.oscarhost.baseUrl')) delete $scope.myform.plugins.oscarhost.settings.fieldMap[currFieldId];

                    //Delete field
                    $scope.myform.form_fields.splice(field_index, 1);
                };
                $scope.duplicateField = function (field_index){
                    var currField = _.cloneDeep($scope.myform.form_fields[field_index]);
                    currField._id = 'cloned'+_.uniqueId();
                    currField.title += ' copy';

                    //Insert field at selected index
                    $scope.myform.form_fields.splice(field_index+1, 0, currField);
                };


                /*
                **  startPage Button Methods
                */

                // add new Button to the startPage
                $scope.addButton = function(){

                    var newButton = {};
                    newButton.bgColor = '#ddd';
                    newButton.color = '#ffffff';
                    newButton.text = 'Button';
                    newButton._id = Math.floor(100000*Math.random());

                    $scope.myform.startPage.buttons.push(newButton);
                };

                // delete particular Button from startPage
                $scope.deleteButton = function(button){
                    var currID;
                    for(var i = 0; i < $scope.myform.startPage.buttons.length; i++){

                        currID = $scope.myform.startPage.buttons[i]._id;
                        console.log(currID);

                        if(currID === button._id){
                            $scope.myform.startPage.buttons.splice(i, 1);
                            break;
                        }
                    }
                };


                /*
                **  Field Option Methods
                */

                // add new option to the field
                $scope.addOption = function(field_index){
                    var currField = $scope.myform.form_fields[field_index];
					console.log(field_index);
					console.log(currField);

					if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
                        if(!currField.fieldOptions) $scope.myform.form_fields[field_index].fieldOptions = [];

                        var lastOptionID = 0;

                        if(currField.fieldOptions[currField.fieldOptions.length-1]){
                            lastOptionID = currField.fieldOptions[currField.fieldOptions.length-1].option_id;
                        }

                        // new option's id
                        var option_id = lastOptionID + 1;

                        var newOption = {
                            'option_id' : Math.floor(100000*Math.random()),
                            'option_title' : 'Option '+lastOptionID,
                            'option_value' : 'Option ' +lastOptionID
                        };

                        // put new option into fieldOptions array
                        $scope.myform.form_fields[field_index].fieldOptions.push(newOption);
                    }
                };

                // delete particular option
                $scope.deleteOption = function (field_index, option){
                    var currField = $scope.myform.form_fields[field_index];

                    if(currField.fieldType === 'checkbox' || currField.fieldType === 'dropdown' || currField.fieldType === 'radio'){
                        for(var i = 0; i < currField.fieldOptions.length; i++){
                            if(currField.fieldOptions[i].option_id === option.option_id){

                                $scope.myform.form_fields[field_index].fieldOptions.splice(i, 1);
                                break;

                            }
                        }
                    }
                };

                // decides whether field options block will be shown (true for dropdown and radio fields)
                $scope.showAddOptions = function (field){
                    if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'radio'){
                        return true;
                    } else {
                        return false;
                    }
                };

            }

        };
    }
]);
