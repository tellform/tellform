'use strict';

angular.module('forms').directive('configureFormDirective', ['$http', '$timeout', 'timeCounter', 'Auth', 'FormFields',
    function ($http, $timeout, timeCounter, Auth, FormFields) {
        return {
            controller: function($scope){
                $scope.log = '';
                $scope.pdfLoading = false;
                var _current_upload = null;


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

            },
            templateUrl: './modules/forms/views/directiveViews/form/configure-form.html',
            restrict: 'E',
            scope: {
                form:'=',
                user:'=',
                pdfFields:'@',
                formFields:'@'
            }
        };
    }
]);