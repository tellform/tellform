'use strict';

angular.module('forms').controller('EditFormController', ['$scope', '$state', '$rootScope', 'Upload', '$stateParams', 'FormFields', 'Forms', 'CurrentForm', '$modal', '$location', '$http',
    function ($scope, $state, $rootScope, Upload, $stateParams, FormFields, Forms, CurrentForm, $modal, $location, $http) {

        $scope.isNewForm = false;
        $scope.pdfLoading = false;

        $scope.form = {};
        $scope.log = '';
        var _current_upload = null;

        // Get current form if it exists, or create new one
        if($stateParams.formId){
            Forms.get({ formId: $stateParams.formId}, function(form){
                $scope.form = angular.fromJson(angular.toJson(form));
                console.log($scope.form);
            });
        } else {
            $scope.form.form_fields = [];
            $scope.isNewForm = true;
        }

        //PDF Functions
        $scope.cancelUpload = function(){
            _current_upload.abort();
            $scope.pdfLoading = false;
            $scope.removePDF();
        };

        $scope.removePDF = function(){
            $scope.form.pdf = null;
            $scope.form.isGenerated = false;
            $scope.form.autofillPDFs = false;

            console.log('form.pdf: '+$scope.form.pdf+' REMOVED');
        };

        $scope.uploadPDF = function(files) {

            if (files && files.length) {
                // for (var i = 0; i < files.length; i++) {
                var file = files[0];
                _current_upload = Upload.upload({
                    url: '/upload/pdf',
                    fields: {
                        'user': $scope.user,
                        'form': $scope.form
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                    $scope.pdfLoading = true;
                }).success(function (data, status, headers, config) {
                    $scope.log = 'file ' + data.originalname + ' uploaded as '+ data.name +'. JSON: ' + JSON.stringify(data) + '\n' + $scope.log;
                    console.log($scope.form.pdf);
                    $scope.form.pdf = angular.fromJson(angular.toJson(data));
                    $scope.pdfLoading = false;

                    console.log($scope.log);
                    console.log('$scope.pdf: '+$scope.form.pdf.name);
                    if(!$scope.$$phase){
                        $scope.$apply();
                    }
                }).error(function(err){
                    $scope.pdfLoading = false;
                    console.log('Error occured during upload.\n');
                    console.log(err);
                });
                // }
            }
        };

        $scope.goToWithId = function(route, id) {
            $state.go(route, {'formId': id}, {reload: true});
        };

        // Create new Form
        $scope.createOrUpdate = function() {

            if($scope.isNewForm){
                // Create new Form object
                var form = new Forms($scope.form);

                $http.post('/forms', {form: $scope.form})
                .success(function(data, status, headers){
                    console.log('form created');

                    // Clear form fields
                    $scope.form = {};
                    // Redirect after save 
                    $scope.goToWithId('viewForm', response._id);
                }).error(function(err){
                    console.log(errorResponse.data.message);
                    $scope.error = errorResponse.data.message;
                });
            } else{
                $scope.update();
            }
        };

        // Update existing Form
        $scope.update = function() {
            var form = new Forms($scope.form);
            console.log('update form');
            console.log($scope.form);

            $http.put('/forms/'+$scope.form._id, {form: $scope.form})
            .success(function(data, status, headers){
                console.log('form updated successfully');
                $scope.goToWithId('viewForm', $scope.form._id);
            }).error(function(err){
                console.log('Error occured during form UPDATE.\n');
                console.log(err);
            });
            // form.$update({formId: $scope.form._id}, function(response) {
            //     console.log('form successfully updated');
            //     $scope.goToWithId('viewForm', response._id);
            // }, function(errorResponse) {
            //     console.log(errorResponse.data.message);
            //     $scope.error = errorResponse.data.message;
            // });
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
    }
]);