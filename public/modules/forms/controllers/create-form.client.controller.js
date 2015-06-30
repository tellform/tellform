'use strict';

angular.module('forms').controller('EditFormController', ['$scope', '$state', 'Upload', '$stateParams', 'FormFields', 'Forms', 'CurrentForm', '$modal', '$location',
    function ($scope, $state, Upload, $stateParams, FormFields, Forms,  CurrentForm, $modal, $location) {
        // Principal.identity().then(function(user){
        //     $scope.authentication.user = user;
        // }).then(function(){
            // console.log('aeouaoeuaoeuaou');
            // console.log('isAuthenticated(): '+Principal.isAuthenticated());\
            
            $scope.isNewForm = false;
            $scope.log = '';

            // Get current form if it exists, or create new one
            if($stateParams.formId){
                $scope.form = {};
                var _form = Forms.get({ formId: $stateParams.formId}, function(form){
                    _form.pdf = form.pdf;
                    _form.$save();

                    $scope.form = angular.fromJson(angular.toJson(_form));
                    console.log(JSON.stringify($scope.form.pdf));
                });
            } else {
                $scope.form = {};
                $scope.form.form_fields = [];
                $scope.isNewForm = true;
            }

            //PDF Functions

            $scope.cancelUpload = function(){
                //TBD
            };

            $scope.removePDF = function(){
                $scope.form.pdf = null;

                console.log('form.pdf exists: '+!!$scope.form.pdf);
            };

            $scope.uploadPDF = function(files) {

                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        Upload.upload({
                            url: '/upload/pdf',
                            fields: {
                                'user': $scope.form.admin,
                                'form': $scope.form
                            },
                            file: file
                        }).progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.log = 'progress: ' + progressPercentage + '% ' +
                                        evt.config.file.name + '\n' + $scope.log;
                        }).success(function (data, status, headers, config) {
                            $scope.log = 'file ' + data.originalname + 'uploaded as '+ data.name +'. JSON: ' + JSON.stringify(data) + '\n' + $scope.log;
                            $scope.pdf = data;
                            $scope.form.pdf = data;

                            if(!$scope.$$phase) {
                                $scope.$apply();
                            }

                            console.log($scope.log);
                            console.log('$scope.pdf: '+$scope.pdf.name);
                        });
                    }
                }
            };

            $scope.goToWithId = function(route, id) {
                $state.transitionTo(route, { 'formId' : id }, { reload: true });
            };

            // Create new Form
            $scope.createOrUpdate = function() {

                if($scope.isNewForm){
                    // Create new Form object
                    var form = new Forms($scope.form);


                    form.$save(function(response) {

                        console.log('form created');
                        // console.log(response.pdf);

                        // Clear form fields
                        $scope.form = {};

                        // Redirect after save 
                        $location.path('forms/' + response._id + '/admin');

                    }, function(errorResponse) {
                        console.log(errorResponse.data.message);
                        $scope.error = errorResponse.data.message;
                    });
                } else{
                    console.log('update form');
                    $scope.update();
                }
            };

            // Update existing Form
            $scope.update = function() {
                var form = new Forms($scope.form);
                form.$update(function(response) {
                    console.log('form updated');
                    // console.log(response.pdf);
                    $location.path('forms/' + response._id + '/admin');
                }, function(errorResponse) {
                    console.log(errorResponse.data.message);
                    $scope.error = errorResponse.data.message;
                });
            };

            //Populate AddField with all available form field types
            $scope.addField = {};
            $scope.addField.types = FormFields.fields;
            $scope.addField.new = $scope.addField.types[0].name;
            $scope.addField.lastAddedID = 0;


            // preview form mode
            $scope.previewMode = false;

            // previewForm - for preview purposes, form will be copied into this
            // otherwise, actual form might get manipulated in preview mode
            $scope.previewForm = {};


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
                $scope.form.form_fields.push(newField);
                // console.log($scope.form.form_fields);
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


            // preview form
            $scope.previewOn = function(){
                if($scope.form.form_fields === null || $scope.form.form_fields.length === 0) {
                    var title = 'Error';
                    var msg = 'No fields added yet, please add fields to the form before preview.';
                    var btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];

                    // $dialog.messageBox(title, msg, btns).open();
                }
                else {
                    $scope.previewMode = !$scope.previewMode;
                    $scope.form.submitted = false;
                    angular.copy($scope.form, $scope.previewForm);
                }
            };

            // hide preview form, go back to create mode
            $scope.previewOff = function(){
                $scope.previewMode = !$scope.previewMode;
                $scope.form.submitted = false;
            };

            // decides whether field options block will be shown (true for dropdown and radio fields)
            $scope.showAddOptions = function (field){
                if(field.field_type === 'radio' || field.field_type === 'dropdown')
                    return true;
                else
                    return false;
            };

        // });
    }
]);