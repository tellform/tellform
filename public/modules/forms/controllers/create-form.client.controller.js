// 'use strict';

// angular.module('forms').controller('EditFormController', ['$scope', '$state', '$rootScope', 'Upload', '$stateParams', 'FormFields', 'Forms', 'CurrentForm', '$modal', '$location', '$http',
//     function ($scope, $state, $rootScope, Upload, $stateParams, FormFields, Forms, CurrentForm, $modal, $location, $http) {
//         $scope.form = {};
//         $scope.isNewForm = false;
//         $scope.log = '';
//         $scope.pdfLoading = false;
//         var _current_upload = null;

//         // Get current form if it exists, or create new one
//         if($stateParams.formId){
//             Forms.get({ formId: $stateParams.formId}, function(form){
//                 $scope.form = angular.fromJson(angular.toJson(form));
//                 console.log($scope.form);
//             });
//         } else {
//             $scope.form.form_fields = [];
//             $scope.isNewForm = true;
//         }

//         //PDF Functions
//         $scope.cancelUpload = function(){
//             _current_upload.abort();
//             $scope.pdfLoading = false;
//             $scope.removePDF();
//         };

//         $scope.removePDF = function(){
//             $scope.form.pdf = null;
//             $scope.form.isGenerated = false;
//             $scope.form.autofillPDFs = false;

//             console.log('form.pdf: '+$scope.form.pdf+' REMOVED');
//         };

//         $scope.uploadPDF = function(files) {

//             if (files && files.length) {
//                 // for (var i = 0; i < files.length; i++) {
//                 var file = files[0];
//                 _current_upload = Upload.upload({
//                     url: '/upload/pdf',
//                     fields: {
//                         'user': $scope.user,
//                         'form': $scope.form
//                     },
//                     file: file
//                 }).progress(function (evt) {
//                     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                     $scope.log = 'progress: ' + progressPercentage + '% ' +
//                                 evt.config.file.name + '\n' + $scope.log;
//                     $scope.pdfLoading = true;
//                 }).success(function (data, status, headers, config) {
//                     $scope.log = 'file ' + data.originalname + ' uploaded as '+ data.name +'. JSON: ' + JSON.stringify(data) + '\n' + $scope.log;
//                     console.log($scope.form.pdf);
//                     $scope.form.pdf = angular.fromJson(angular.toJson(data));
//                     $scope.pdfLoading = false;

//                     console.log($scope.log);
//                     console.log('$scope.pdf: '+$scope.form.pdf.name);
//                     if(!$scope.$$phase){
//                         $scope.$apply();
//                     }
//                 }).error(function(err){
//                     $scope.pdfLoading = false;
//                     console.log('Error occured during upload.\n');
//                     console.log(err);
//                 });
//                 // }
//             }
//         };

//         $rootScope.goToWithId = function(route, id) {
//             $state.go(route, {'formId': id}, {reload: true});
//         };

//         // Create new Form
//         $rootScope.createOrUpdate = function() {

//             if($scope.isNewForm){
//                 // Create new Form object
//                 var form = new Forms($scope.form);

//                 $http.post('/forms', {form: $scope.form})
//                 .success(function(data, status, headers){
//                     console.log('form created');

//                     // Clear form fields
//                     $scope.form = {};
//                     // Redirect after save 
//                     $scope.goToWithId('viewForm', $scope.form._id);
//                 }).error(function(errorResponse){
//                     console.log(errorResponse);
//                     $scope.error = errorResponse;
//                 });
//             } else{
//                 $scope.update(function(err){
//                     console.log('done updating');
//                 });
//             }
//         };

//         // Update existing Form
//         $rootScope.update = function(cb) {
//             var form = new Forms($scope.form);
//             console.log('update form');
//             console.log($scope.form);

//             $http.put('/forms/'+$scope.form._id, {form: $scope.form})
//             .success(function(data, status, headers){
//                 console.log('form updated successfully');
//                 $scope.goToWithId('viewForm', $scope.form._id);
//                 cb(null);
//             }).error(function(err){
//                 console.log('Error occured during form UPDATE.\n');
//                 console.log(err);
//                 cb(err);
//             });
//         };
//     }
// ]);
