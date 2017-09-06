'use strict';

angular.module('forms').directive('previewFormDirective', ['$rootScope', '$sce',
    function ($rootScope, $sce) {
        return {
            templateUrl: 'modules/forms/admin/views/directiveViews/form/preview-form.client.view.html',
            restrict: 'E',
            scope: {
                myform:'=',
                actualformurl:'='
            },
            controller: function($scope){
                $scope.trustSrc = function (src) {
                    return $sce.trustAsResourceUrl(src);
                };
                $scope.resetForm = $rootScope.resetForm;
                $scope.update = $rootScope.update;
                $scope.actualFormURL = $scope.actualformurl
            }
        };
    }
]);
