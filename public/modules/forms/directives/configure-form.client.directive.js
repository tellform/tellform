'use strict';

angular.module('forms').directive('configureFormDirective', ['$rootScope', '$http', 'Upload', '$timeout', 'timeCounter', 'Auth', 'FormFields',
    function ($rootScope, $http, Upload, $timeout, timeCounter, Auth, FormFields) {
        return {
            controller: function($scope){
                $scope.log = '';
                $scope.pdfLoading = false;
                $scope.languages = $rootScope.languages;
                
                var _current_upload = null;
                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

                var _unbindedPdfFields = $scope.pdfFields;

                //DAVID: TODO: finish this so we can create a Form.pdfFieldMap
                // $scope.getUnbindedPdfFields = function(fieldType){
                //     _unbindedPdfFields = $scope.pdfFields
                // }

                //PDF Functions
                $scope.cancelUpload = function(){
                    _current_upload.abort();
                    $scope.pdfLoading = false;
                    $scope.removePDF();
                };

                $scope.removePDF = function(){
                    $scope.myform.pdf = null;
                    $scope.myform.isGenerated = false;
                    $scope.myform.autofillPDFs = false;

                    console.log('form.pdf: '+$scope.myform.pdf+' REMOVED');
                };

                $scope.uploadPDF = function(files) {

                    if (files && files.length) {
                        // for (var i = 0; i < files.length; i++) {
                        var file = files[0];
                        console.log(file);

                        _current_upload = Upload.upload({
                            url: '/upload/pdf',
                            fields: {
                                'user': $scope.user,
                                'form': $scope.myform
                            },
                            file: file
                        }).progress(function (evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            $scope.log = 'progress: ' + progressPercentage + '% ' +
                                        evt.config.file.name + '\n' + $scope.log;
                            $scope.pdfLoading = true;
                        }).success(function (data, status, headers, config) {
                            $scope.log = 'file ' + data.originalname + ' uploaded as '+ data.name +'. JSON: ' + JSON.stringify(data) + '\n' + $scope.log;
                            $scope.myform.pdf = angular.fromJson(angular.toJson(data));

                            console.log($scope.myform.pdf);

                            $scope.pdfLoading = false;

                            console.log($scope.log);
                            if(!$scope.$$phase && !$scope.$digest){
                                $scope.$apply();
                            }
                        }).error(function(err){
                            $scope.pdfLoading = false;
                            console.log('Error occured during upload.\n');
                            console.log(err);
                        });
                    }
                };

            },
            templateUrl: './modules/forms/views/directiveViews/form/configure-form.html',
            restrict: 'E',
            scope: {
                myform:'=',
                user:'=',
                pdfFields:'@',
                formFields:'@'
            }
        };
    }
]);