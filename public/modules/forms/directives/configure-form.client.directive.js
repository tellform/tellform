'use strict';

angular.module('forms').directive('configureFormDirective', [
	'$rootScope', '$http', 'Upload', 'CurrentForm', '$templateCache',
    function ($rootScope, $http, Upload, CurrentForm, $templateCache) {
        return {
            template: $templateCache.get('modules/forms/views/directiveViews/form/configure-form.client.view.html'),
            restrict: 'E',
            scope: {
                myform:'=',
                user:'=',
                pdfFields:'@',
                formFields:'@'
            },
            controller: function($scope){
                console.log($scope.myform);
                if( CurrentForm.getForm().plugins){
                    if(CurrentForm.getForm().plugins.oscarhost.baseUrl) $scope.oscarhostAPI = true;
                }else{
                    $scope.oscarhostAPI = false;
                }
                $scope.log = '';
                $scope.pdfLoading = false;
                $scope.languages = $rootScope.languages;

                this._current_upload = null;
                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;

                this._unbindedPdfFields = $scope.pdfFields;

                //DAVID: TODO: finish this so we can create a Form.pdfFieldMap
                // $scope.getUnbindedPdfFields = function(fieldType){
                //     this._unbindedPdfFields = $scope.pdfFields
                // }

                //PDF Functions
                $scope.cancelUpload = function(){
                    this._current_upload.abort();
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
                    // console.log(files);

                    if (files && files.length) {
                        var file = files[0];
                        console.log(file);

                        this._current_upload = Upload.upload({
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

                            // console.log($scope.myform.pdf);

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

            }
        };
    }
]);
