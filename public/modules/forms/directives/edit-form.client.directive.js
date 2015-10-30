'use strict';

angular.module('forms').directive('editFormDirective', ['$rootScope', '$q', '$http', '$timeout', 'TimeCounter', 'Auth', 'FormFields',
    function ($rootScope, $q, $http, $timeout, TimeCounter, Auth, FormFields) {
        return {
            templateUrl: 'modules/forms/views/directiveViews/form/edit-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'=',
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

                        // console.log($scope.myform.plugins.oscarhost.settings.fieldMap);
                        //Get all oscarhostFields that haven't been mapped to a formfield
                        return _(oscarhostFields).difference(currentFields).value();
                    }
                    return [];
                };

                /*
                ** FormFields (ui-sortable) drag-and-drop configuration
                */
                $scope.dropzone = {
                    handle: ' .handle'  
                };

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
                //         //     $scope.addField.types = FormFields.types;
                //         // }
                      
                        
                //     }
                // };


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
                    $scope.myform.plugins.oscarhost.settings.fieldMap = {};
                    //Delete field from field map
                    var currFieldId = $scope.myform.form_fields[field_index]._id
                    delete $scope.myform.plugins.oscarhost.settings.fieldMap[currFieldId];

                    //Delete field
                    $scope.myform.form_fields.splice(field_index, 1);
                };
                $scope.duplicateField = function (field_index){
                    var currField = $scope.myform.form_fields[field_index];  

                    //Insert field at selected index
                    $scope.myform.form_fields.splice(field_index+1, 0, currField);
                };


                /*
                **  startPage Button Methods
                */

                // add new Button to the startPage/EndPage
                $scope.addButton = function(){

                    var newButton = {};
                    newButton.bgColor = '#ddd';
                    newButton.color = '#ffffff';
                    newButton.text = 'Button';
                    newButton._id = _.uniqueId();

                    $scope.myform.startPage.buttons.push(newButton);
                };

                // delete particular Button
                $scope.deleteButton = function(button){
                    // var hashKey = _.chain(button.$$hashKey).words().last().parseInt().value();
                    var currID;
                    for(var i = 0; i < $scope.myform.startPage.buttons.length; i++){
                        // var currHashKey = _.chain($scope.myform.startPage.buttons[i].$$hashKey).words().last().parseInt().value();
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
                $scope.addOption = function (field){
                    if(!field.fieldOptions) field.fieldOptions = [];

                    var lastOptionID = 0;

                    if(field.fieldOptions[field.fieldOptions.length-1]){
                        lastOptionID = field.fieldOptions[field.fieldOptions.length-1].option_id;
                    }

                    // new option's id
                    var option_id = lastOptionID + 1;

                    var newOption = {
                        'option_id' : option_id,
                        'option_value' : 'Option ' + option_id,
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
                    if(field.fieldType === 'dropdown' || field.fieldType === 'checkbox' || field.fieldType === 'radio'){
                        return true;
                    } else {
                        return false;
                    }
                };

            },
  
        };
    }
]);